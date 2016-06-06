var appstore_url = "YOUR_APPSTORE_URL";
var app_url_scheme = "YOUR_APP_URL_SCHEME";
var http = require("http");
var url = require("url");
var server = http.createServer();
var port = process.env.PORT || 3000;

server.on("request", function(request, response) {
    var urlObject = url.parse(request.url);
    var deeplink = urlObject.hash ? urlObject.path.slice(1) + urlObject.hash : urlObject.path.slice(1);
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('<!DOCTYPE "html">');
    response.write('<html>');
    response.write('<head>');
    response.write('<title>Redirecting...</title>');
    response.write('</head>');
    response.write('<body>');
    response.write('<script>window.location = "'+app_url_scheme+deeplink+'"; setTimeout( function() { window.location = "'+appstore_url+'"; }, 500);</script>"');
    response.write('</body>');
    response.write('</html>');
    response.end();
});

server.on('listening', function() {
    console.log("Server started on port %s at %s", server.address().port, server.address().address);
});

if (process.argv.length > 2) {
    port = process.argv[2];
}

server.listen(port);
