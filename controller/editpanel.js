/**
 * @file editpanel.js
 * @author Sylvain Ribstein,915615732
 * @date 20 May 15
 * @description A controller for editpanelView.
 */
var fs=require('fs');
var path = require('path');
var fabric=require('fabric').fabric;
var panelFct=require('./panel');

/**
 * stream to client the editpanel page
 * @param response the data that will be send to the client
 * @param argv not use but can be if the project get bigger
 */
this.create = function(response,argv){
    //    console.log("about to create the page editpanel");
    var view ="view/editpanel.html";
    //    var header="view/header.html";
    fs.stat(view, function(err, stat){
	if( err ) {
	    response.writeHead(404, {'Content-Type': 'text/html',
				     'Access-Control-Allow-Origin': '*'});
	    response.end(""+err);
	    return;
	}
	response.writeHead(200,{"Content-Type":"text/html"});
	var bodyStream = fs.createReadStream(view);
	bodyStream.pipe(response);
    });
}

/**
 * Save panel into image(.png)
 * @param panelPath the path to find the panel
 * @param data a json for the panel
 * @param cb callback function for savepng, so the function can be use asynchronously
 */
var savepng=function(panelPath,data,cb){
    var dataArray=JSON.parse(data);
    console.log("editpanel/savepng");
    var canvas = fabric.createCanvasForNode(700, 550);
    canvas.loadFromJSON(dataArray[0], function() {
	canvas.renderAll();
	var stream = canvas.createPNGStream();
	var fileStream=fs.createWriteStream(panelPath+".png");
	stream.pipe(fileStream);
	cb(true);
    });
}

/**
 * Save panel into JSON
 * @param panelPath the path to find the panel
 * @param data a json for the panel
 * @param cb callback function for savejson, so the function can be use asynchronously
 */
var savejson=function(panelPath,data,cb){
    var dataArray=JSON.parse(data);
    console.log("editpanel/savejson");
    console.log("canvas : \n"+dataArray[0]);
    console.log("metadata : \n"+dataArray[1]);
    fs.writeFile(panelPath,JSON.stringify(dataArray[0]),function(err){//save canvas
	if(err){
	    console.log("editpanel/savejson error write "+err);
	    cb(false);
	}
	cb(true);
	fs.writeFile(panelPath+".txt",dataArray[1],function(err){//save metadata
	    if(err){
		console.log("editpanel/savejson error write "+err);
		cb(false);
	    }
	    cb(true);
	});
    });
}

/**
 * Save panel into storyflow
 * @param response the data that will be send to the client
 * @param argv [storyflow,parent panel name, panel name]
 * @param postData the data reveiced from the client containing the canvas and the metadata
 */
this.savepanel=function(response,argv,postData){
    var storyflow=__dirname+"/../storyflow/"+argv[0],
	panelParent=argv[1],
	panel=argv[2];
    console.log("editpanel/savepanel "
		+path.basename(storyflow)+" "
		+panelParent+" "
		+panel);
    console.log("postData : \n"+postData);
    panelFct.findpathpanel(storyflow,panelParent,function(err,panelPath){
	if(err){
	    
	}else{
	    console.log("editpanel/savepanel panelpath : "+panelPath);
	    if(panel==panelParent){
		panelPath=path.join(panelPath,panel);
	    }else{
		panelPath=path.join(panelPath,panel);
		fs.mkdirSync(panelPath);
		panelPath=path.join(panelPath,panel);
	    }				    
	    savejson(panelPath,postData,function(success){
		if(success){
		    savepng(panelPath,postData,function(success){
			response.writeHead(200,{"Content-Type":"application/json"});
			response.end("{upload:success}");
		    });
		}
		else{
		    response.writeHead(200,{"Content-Type":"application/json"});
		    response.end("{upload:failed}");
		}
	    });
	}	
    });
}




