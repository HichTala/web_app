console.log('Starting the server...');
var http = require('http');
var fs = require('fs');
var path = require('path'); // Import the path module for working with file paths

const PORT = 8080;

http.createServer(function(request, response) {
    console.log('Request received');
    console.log(request)

    // Parse the URL to determine which file to serve
    var filePath = '.' + request.url;
    if (filePath === './') {
        filePath = './html/main.html'; // Default to serving main.html
    }

    // Get the file extension to set the appropriate Content-Type header
    var extname = String(path.extname(filePath)).toLowerCase();
    var contentType = 'text/html';
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
    };
    contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if (error.code === 'ENOENT') {
                response.writeHead(404, {'Content-Type': 'text/plain'});
                response.end('File not found');
            } else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            }
        } else {
            response.writeHead(200, {'Content-Type': contentType});
            response.end(content);
        }
    });

}).listen(PORT, function() {
    console.log(`Server running at http://localhost:${PORT}`);
});
