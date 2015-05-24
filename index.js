/**
 * @file index.js
 * @author Sylvain Ribstein, 915615732
 * @date 20 May 15
 * @description file that need to be start by "node index.js" to start the server
 */var server=require('./server');
var router=require('./router');

server.start(router.route);
//load function and start the server
