const http = require('http');
const app = require('./server/app');

const port = process.env.port || 9999;

const server = http.createServer(app.app);
console.log('Server listening on port', port);
server.listen(port);
