/**
 * @file router.js
 * @author Sylvain Ribstein, 915615732
 * @date 20 May 15
 * @description contain the router of the server, it's a sort of MVC
 */
 
 var path=require('path');
var fs=require('fs');
var url = require("url");
/*
 *route(request,response,postData)
 *this function will differenciate 2 types of request :
 * -If the request ask for a file directly, the response will be stream
 * -If not, it will call the fonction controller 
 */
function route(request,response,postData) {
    pathname=url.parse(request.url).pathname;
    fs.readFile(__dirname+pathname,function(err,data){
	console.log("router/route : request "+pathname);
	if(err){//if the file do not exist
	    //console.log(err);
	    controller(response,pathname,postData);
	}
	else{//stream the file
	    console.log("router/route : sending "+pathname);
	    response.write(data);
	    response.end();
	}
    });
}


/*
*
*controller(response,pathname,postData)
*controller take the same variable as route,is only called if the request is not a file 
*parse the request url by '/' to have 
*  controller called : patharray[0]
*  function of controller called : patharray[1]
*  the rest of the patharray is for the argument of the function
*/

function controller(response,pathname,postData) {
    var patharray=pathname.split('/');
    patharray=patharray.slice(1,patharray.length);
    console.log("router/controller : request controller for /" + patharray.join('/'));
    //console.log("patharray : "+patharray.join(' | ')+"\npatharray.length : "+patharray.length);
    var requireModule="";//This will save the controller to be load
    if(patharray[0]==""){//if empty we load the index
	requireModule=require.resolve('./controller/index');
    }
    else{
	try{//try to see if the controller of patharray[0] exist 
	    console.log("controller exists "+require.resolve('./controller/'+patharray[0]));
	    requireModule=require.resolve('./controller/'+patharray[0]);
	}
	catch(e){//if not we send back the error controller
	    requireModule = require.resolve('./controller/error');
	    patharray=[];
	}
    }
    var controller=require(requireModule);//require the controller found just before
    if(patharray.length<2){
	//if there is no function asked in patharray we call the 'create' function, which send the view without args
	console.log("router/controller : create without args "+patharray[0]);
	controller.create(response,[]);
    }
    else if(typeof controller[patharray[1]]==='function'){
	//if there is a function asked and it exist we call it with the rest of path array as args
	console.log("router/controller : call  "+patharray[1]+" of "+patharray[0]);
	controller[patharray[1]](response,patharray.slice(2,patharray.length),postData);
    }
    else{//if it's not a function we call the function create with the rest of the patharray
	console.log("router/controller : create with args "+patharray.join('/'));
	controller.create(response,patharray.slice(2,patharray.length));
    }
}

exports.route = route;
