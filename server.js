console.log('Starting the server...');
var http = require('http')
var fs = require('fs')

const PORT = 8080

fs.readFile('./html/main.html', function(error, html) {
   if (error) throw error;
   http.createServer(function(request, response) {
       console.log('Request received');
       response.writeHeader(200, {"Content-Type": "text/html"});
       response.write(html);
       response.end();
   }).listen(PORT, function() {
       console.log(`Server running at http://localhost:${PORT}`);
   });
});