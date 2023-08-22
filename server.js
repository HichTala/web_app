console.log('Starting the server...');
var http = require('http');
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');

const PORT = 8080;

http.createServer(function(request, response) {
    console.log('Request received');

    if (request.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(request, function (err, fields, files) {

            const execSync = require('child_process').execSync;

            const output = execSync('python3 python/main.py ' + fields.client + ' ' + ' ' + fields.commande + ' ' + fields.montant, { encoding: 'utf-8' });
            console.log('Output was:\n', output);
        });
        var filePath = './pdf.pdf';

    } else {
        var filePath = '.' + request.url;
    }

    // Parse the URL to determine which file to serve
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
        '.pdf': 'application/pdf'
    };
    contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if (error.code === 'ENOENT') {
                response.writeHead(404, {'Content-Type': 'text/plain'});
                response.end('File not found');
            } else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin (HichTala) for error: ' + error.code + ' ..\n');
            }
        } else {
            response.writeHead(200, {'Content-Type': contentType});
            response.end(content);
        }
    });

}).listen(PORT, function() {
    console.log(`Server running at http://localhost:${PORT}`);
});
