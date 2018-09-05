const http = require('http');
const app = require('./app');
const formidable = require('formidable');

const port = process.env.port || 3000;

const server = http.createServer(app);

server.listen(port);