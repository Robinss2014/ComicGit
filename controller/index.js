/**
 * @file index.js
 * @author Sylvain Ribstein, 915615732
 * @date 20 May 15
 * @description A controller for index.html.
 */
var fs=require('fs');

/**
 * stream the index view to the client
 * @param response the data that will be send to the client
 * @param argv not use for now, but will be if the project get bigger
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
	}
    });
    
}

/**
 * response all the name of all storyflow
 * @param response tha data that will be send to the client
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
 * list all the directory that are into the storyflow directory
 * @param cb callback function, so the function can be call asynchronously
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
