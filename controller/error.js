this.create = function(response){
    console.log("about to create the page error");
    response.writeHead(404,{"Content-Type":"text/html"});
    response.write('<h1>404, page not found</h1>');
    response.end();
}
