var express = require('express');
var app = express(); // object to initialize express
// Order matters!!!
app.use(express.static('./public'));
// if the file is not in public folder then it will move on to execute below code
// app.all() responds to any http requests
app.all('*', function (request, response, next) {
    response.send(request.method + ' to path ' + request.path);
    next();
});

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here

