const http = require('http');
const app = require('./app');

const port = process.env.port || 80;

const server = http.createServer(app);
console.log('Server listening on port 80');
server.listen(port);
