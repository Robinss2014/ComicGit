var fs=require('fs');
var path = require('path');
var fabric=require('fabric').fabric;
var panelFct=require('./panel');

this.create = function(response,argv){
    //    console.log("about to create the page editpanel");
    var view ="view/slideshow.html";
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
