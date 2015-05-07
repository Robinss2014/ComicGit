var http = require("http");
/*server listening on port 8888
 *route is the function which will route the request reveived 
 */
function start(route) {
    function onRequest(request, response) {
	var postData="";
	request.addListener('data',function(postDataChunk){
	    //request.addListener listen to the request to see if the client/request send some post data (form,....)
	    postData+=postDataChunk;
	    console.log("received POST data chunk '"+postDataChunk+"'.'");
	});
	request.addListener("end",function(){
	    //when postData received everything route the request with the data
	    route(request,response,postData);
	});
	
    }
    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}
exports.start = start;
