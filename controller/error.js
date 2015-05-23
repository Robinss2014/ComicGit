/**
 * @file create.js
 * @author Sisi Wei, 915565877
 * @date 20 May 15
 * @description A controller for error page.
 */

/**
 * Create the route for error
 * @param response an response to the error
 */
this.create = function(response){
    console.log("about to create the page error");
    response.writeHead(404,{"Content-Type":"text/html"});
    response.write('<h1>404, page not found</h1>');
    response.end();
}
