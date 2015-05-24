/**
 * @file panel.js
 * @author Sylvain Ribstein, 915615732
 * @date 20 May 15
 * @description A class for panel which contains different function relative to the panel
 */
var path=require('path');
var fs=require('fs');
var fabric=require('fabric').fabric;

/**
 * Find the path for a panel
 * recurcive function
 * @param panelFrom : the panel where we are going to look at now
 * @param panel : the panel we are looking for 
 * @param cb: callback function,so the function can be called asynchronously
 */
var findpathpanel=function(panelFrom,panel,cb){
    console.log("panel/findpathpanel "+panelFrom+" "+panel);
    fs.mkdir(panelFrom,'0755',function(err){// create directory
	if(err && err.code!='EEXIST')
	    cb(err,null);
	else{//if the directory get created or it already exist
	    if(path.basename(panelFrom)===panel){//if the directory we just created is the one we are looking for (1st panel of a storyflow)
		cb(null,panelFrom);
	    }
	    else{
		fs.readdir(panelFrom,function(err,files){
		    if(err)
			cb(err,null);
		    else{
			console.log("files "+files.join(' | '));
			var direc=files.map(function(file){
			    return path.join(panelFrom,file);
			}).filter(function (file){
			    return fs.statSync(file).isDirectory();
			}).forEach(function (file){//for each directory of the current directory call recursively the function
			    console.log("basename : "+path.basename(file));
			    findpathpanel(file,panel,cb);
			});
		    }
		});
	    }
	}
    });
}
exports.findpathpanel=findpathpanel;

/**
 * Find the path for a panel
 * @param response the data that will be send to the client
 * @param argv contain the storyflow name, and the panel we are looking for
 */
this.pathpanel=function(response,argv){
    var storyflow=__dirname+"/../storyflow/"+argv[0],
	panel=argv[1];
    console.log("storyflow "+storyflow+"\npanel : "+panel);
    findpathpanel(storyflow,panel,function(err,panelPath){
	if(err){
	    response.writeHead(404,{"Content-Type":"text/plain"});
	    response.end(err);
	}else{//if the panel exist, send back the path from /storyflow/ to this panel
	    response.writeHead(200,{"Content-Type":"text/plain"});
	    panelPath=panelPath.split('/');
	    var i=0;
	    while(panelPath[i]!="storyflow")i++;
	    panelPath=panelPath.slice(i,panelPath.length);
	    response.end(JSON.stringify({path:'/'+panelPath.join('/')}));
	}
    });
}


/**
 * To show a panel | this function is not use anymore, as is easier to call directly the file 
 * @param response the data that will be send to the client
 * @param argv storyflow name, and panel name
 */
this.showpanel=function(response,argv){
    var storyflow=__dirname+"/../storyflow/"+argv[0],
	panel=argv[1];
    console.log("storyflow "+storyflow+"\npanel : "+panel);
    findpathpanel(storyflow,panel,function(err,panelPath){
	if(err){
	    response.writeHead(404,{"Content-Type":"text/plain"});
	    response.end(err);
	}else{
	    var canvas = fabric.createCanvasForNode(700,550);
	    panelPath=path.join(panelPath,panel);
	    console.log("panelPath "+panelPath);
	    fs.readFile(panelPath,function(err,data){
		if(err){
		    response.writeHead(404,{"Content-Type":"text/plain"});
		    response.end(err);
		}
		else{
		    var jsonpanel=JSON.parse(data);
		    response.writeHead(200, { 'Content-Type': 'image/png' });
		    //console.log("file json : "+data);
		    canvas.loadFromJSON(jsonpanel, function() {
			canvas.renderAll();
			var stream = canvas.createPNGStream();
			stream.on('data', function(chunk) {
			    response.write(chunk);
			});
			stream.on('end', function() {
			    response.end();
			});
		    });
		}
	    });
	}
    });
}

