/**
 * @file create.js
 * @author Sylvain Ribstein, 915615732
 * @date 20 May 15
 * @description A controller for error page.
 */

/**
 * Create the route for error
 * @param response the data that will be send to the client
 */
this.create = function(response){
    console.log("about to create the page error");
    response.writeHead(404,{"Content-Type":"text/html"});
    response.write('<h1>404, page not found</h1>');
    response.end();
}
