const http = require('http');
const routes = require('./routes');
const server = http.createServer(routes.handler);
// server.listen(3000);
const db = require('./db');

db.connect((err)=>{
    if(err){
        console.log('unable to connect to database');
        process.exit(1);
    }
    else{
        server.listen(3000);
    }
});



