var express = require('express');
var app = express(); // object to initialize express
var myParser = require("body-parser");
// Order matters!!!
app.use(express.static('./public'));
// if the file is not in public folder then it will move on to execute below code
app.use(myParser.urlencoded({ extended: true }));

function isNonNegInt(stringToCheck, returnErrors = false) {
    errors = []; // assume no errors at first
    if(Number(stringToCheck) != stringToCheck) errors.push('Not a number!'); // Check if string is a number value
    if(stringToCheck < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(stringToCheck) != stringToCheck) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0) 
}

// app.all() responds to any http requests
app.all('*', function (request, response, next) {
    response.send(request.method + ' to path ' + request.path);
    next();
});

app.post("/process_form", function (request, response) {
    console.log("Got POST process_form")
    let POST = request.body;
    //response.send(POST); 
    if (typeof GET['quantity_textbox' != 'undefined']) {
        userInput = GET['quantity_textbox'];
        if (isNonNegInt(userInput) == true) {  
            response.send(`Thank you for purchasing ${userInput} lovely things!`) 
            //window.stop();
        } else {
            response.send(`${userInput} is not a quantity! Press the back button and try again.`)
        }
    }
});

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here

