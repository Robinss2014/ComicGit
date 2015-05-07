var server=require('./server');
var router=require('./router');

server.start(router.route);
//load function and start the server
