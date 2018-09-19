const http = require('http');
const app = require('./app');

const port = process.env.port || 8080;

const server = http.createServer(app);
console.log('Server listening on port', port);
server.listen(port);