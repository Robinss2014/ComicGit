/**
 * @file slideshow.js
 * @author Sylvain Ribstein, 915615732
 * @date 20 May 15
 * @description A controller for slideshowView.
 */
var fs=require('fs');
var path = require('path');
var fabric=require('fabric').fabric;
var panelFct=require('./panel');

/**
 * stream the slideshow view to the client
 * @param response the data that will be send to the client
 * @param argv not use for now, but will be if the project get bigger
 */
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
