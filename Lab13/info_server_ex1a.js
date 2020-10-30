var express = require('express');
var app = express(); // object to initialize express

// app.all() responds to any http requests
app.all('*', function (request, response, next) {
    response.send(request.method + ' to path ' + request.path);
});

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here

