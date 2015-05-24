/**
 * @file storyflow.js
 * @author Sylvain Ribstein, 915615732
 * @date 20 May 15
 * @description A controller for storyflowView.
 */
var fs=require('fs');
var path=require('path');


/**
 * Stream the storyflow view to the client
 * @param response the data that will be send to the client
 * @param argv not use for now, but will if the project get bigger
 */
this.create = function(response,argv){
    console.log("storyflow/create"+argv);
    response.writeHead(200,{"Content-Type":"text/html"});
    var path ="view/storyflow.html";
    fs.stat(path, function(err, stat){
	if( err ) {
	    response.writeHead(404, {'Content-Type': 'text/html'});
	    response.end(""+err);
	} else {
	    response.writeHead(200, {
		'Content-Type': 'text/html'});
	    var stream = fs.createReadStream(path);
	    //	    console.log('pipe stream '+path);
	    stream.pipe(response);
	    //console.log("end stream");
	}
    });
}


/**
 * Create the tree a specific storyflow 
 * it's a recursive function
 * @param panelFrom the panel we are looking at right now
 * @param cb callback function, so this function can be call asynchronously
 */
var createTree=function(panelFrom,cb){
    var current={"name":path.basename(panelFrom),children:[]};
    fs.readdir(panelFrom,function(err,files){
	if(err){//if the directory do not containt any file we respond just the name of he directory we are right now
	    cb(current);
	}else{
	    var direc=files.map(function(file){
		return path.join(panelFrom,file);
	    }).filter(function (file){
		return fs.statSync(file).isDirectory();
	    });
	    if(direc.length===0){//if the directory do not containt anydirectory we respond just the name of he directory we are right now
		cb(current);
	    }
	    else{
		var i=0;
		direc.forEach(function(file,index,array){
		    createTree(file,function(childs){
			//console.log("name : :"+current.name+"\n| index : "+index+"\n| i : "+i+"\n| f : "+file+"\n| childs : "+JSON.stringify(childs));
			current.children.push(childs);
			if(i === array.length-1){
			    cb(current);
			}
			i=i+1;
		    });
		});
	    }
	}
    });
}

/**
 * Create json containing the story-tree
 * @param response the data that will be send to the client
 * @param argv storyflow name
 */
this.createjsontree=function(response,argv){
    console.log("storyflow/createjsontree : "+argv[0]);
    var storyflow=__dirname+"/../storyflow/"+argv[0];
    createTree(storyflow,function(tree){
	var treeJSON=JSON.stringify(tree);
	console.log("storyflow/createjsontree : treeJSON : "+treeJSON);
	response.writeHead(200, {'Content-Type': 'application/json'});
	response.end(treeJSON);
    });
}


