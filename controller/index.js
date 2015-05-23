/**
 * @file index.js
 * @author Sisi Wei, 915565877
 * @date 20 May 15
 * @description A controller for index.html.
 */
var fs=require('fs');

/**
 * Create the route for index
 * @param response an response to the index
 * @param argv the panel's name
 */
this.create = function(response,argv){
    console.log("about to create the page index");
    response.writeHead(200,{"Content-Type":"text/html"});
    var path ="view/index.html";
    fs.stat(path, function(err, stat){
	if(err) {
	    response.writeHead(404, {'Content-Type': 'text/plain'});
	    response.end(""+err);
	} else {
	    response.writeHead(200, {
		'Content-Type': 'text/html'});
	    var stream = fs.createReadStream(path);
	    console.log('pipe stream view/index.html');
	    stream.pipe(response);
	    console.log("end stream");
	    //response.end();
	}
    });
    
}

/**
 * Find all of the storyflows paths
 * @param response an response to the index
 */
this.allstoryflow=function(response){
    allstoryflows(function(err,all){
	if(err){
	    response.writeHead(404,{"Content-Type":"text/plain"});
	    response.end(err);
	}
	else{
	    response.writeHead(200,{"Content-Type":"application/json"});
	    console.log("all : "+JSON.stringify(all));
	    response.write(JSON.stringify(all));
	    response.end();
	}
    });
}


/**
 * Find the path for a storyflow
 * @param cb a minimal node.js utility for handling common
 */
var allstoryflows=function(cb){
    var storyflow=__dirname+"/../storyflow/";
    var all={arr:[]}
    fs.readdir(storyflow,function(err,files){
	if(err){
	    cb(err,null);
	}else{
	    files.forEach(function(file){
		console.log("file "+file);
		all.arr.push({name:file});
	    });
	    cb(null,all);
	}
    });
}
