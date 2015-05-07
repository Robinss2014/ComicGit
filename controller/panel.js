var path=require('path');
var fs=require('fs');
var fabric=require('fabric').fabric;
var findpathpanel=function(panelFrom,panel,cb){
    console.log("panel/findpathpanel "+panelFrom+" "+panel);
    fs.mkdir(panelFrom,'0755',function(err){
	if(err && err.code!='EEXIST')
	    cb(err,null);
	else{
	    if(path.basename(panelFrom)===panel){
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
			}).forEach(function (file){
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

this.pathpanel=function(response,argv){
    var storyflow=__dirname+"/../storyflow/"+argv[0],
	panel=argv[1];
    console.log("storyflow "+storyflow+"\npanel : "+panel);
    findpathpanel(storyflow,panel,function(err,panelPath){
	if(err){
	    response.writeHead(404,{"Content-Type":"text/plain"});
	    response.end(err);
	}else{
	    response.writeHead(200,{"Content-Type":"text/plain"});
	    panelPath=panelPath.split('/');
	    var i=0;
	    while(panelPath[i]!="storyflow")i++;
	    panelPath=panelPath.slice(i,panelPath.length);
	    response.end(JSON.stringify({path:'/'+panelPath.join('/')}));
	}
    });
}



this.showpanel=function(response,argv){
    var storyflow=__dirname+"/../storyflow/"+argv[0],
	panel=argv[1];
    console.log("storyflow "+storyflow+"\npanel : "+panel);
    findpathpanel(storyflow,panel,function(err,panelPath){
	if(err){
	    response.writeHead(404,{"Content-Type":"text/plain"});
	    response.end(err);
	}else{
	    var canvas = fabric.createCanvasForNode(1000,1000);
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

