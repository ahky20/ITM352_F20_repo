// File copied from Lab 13 Bonus Exercise 5
var express = require('express');
var app = express(); // object to initialize express
var myParser = require("body-parser");
var data = require('./public/product_data.js'); // use data from product_data.js
var products = data.products;
var fs = require('fs');
var filename = "user_data.json";
var queryString = require('query-string');


app.use(express.static('./public'));
app.use(myParser.urlencoded({ extended: true }));

// code from lab14 ProcessLogin.js
if (fs.existsSync(filename)) {
  data = fs.readFileSync(filename, 'utf-8'); // 'utf-8' makes data readable to user
  //console.log("Success! We got: " + data)

  user_data = JSON.parse(data);
  console.log("User_data=", user_data);
} else {
  console.log("Sorry can't read file " + filename);
}


// code to process login, edited from lab14 ProcessLogin.js
app.post("/process_login", function (request, response) {
  // Process login form POST and redirect to invoice page if ok, back to login page if not
  var login_error = [];
  console.log("Got a POST login request");
  POST = request.body;
  var stringified = queryString.stringify(POST);
  user_name_from_form = POST["username"].toLowerCase();
  console.log("User name from form=" + user_name_from_form);
  if (typeof user_data[user_name_from_form] != 'undefined') {
    if (user_data[user_name_from_form].password == request.body.password) {
      request.query.username = user_name_from_form;
      console.log(user_data[request.query.username].name);
      request.query.name = user_data[request.query.username].name
      response.redirect('/invoice.html?' + stringified)
      return;
    }
    else {
      console.log(login_error);
      request.query.username = user_name_from_form;
      request.query.name = user_data[user_name_from_form].name;
      request.query.login_error = login_error.join(';');
    }
  } else {
    login_error.push = ('Invalid Username or Password');
    console.log(login_error);
    request.query.username = user_name_from_form;
    request.query.name = user_data[user_name_from_form].name;
    request.query.login_error = login_error.join(';');
  }
  response.redirect('./login_page.html?' + queryString.stringify(request.query));
});
// code to process registration
app.post("/register", function (request, response) {
  POST = request.body;
  console.log("Got register POST");
  var register_errors = [];
  var stringified = queryString.stringify(POST);

  // validate registration
  // validate username
  if ((/.{3,9}/.test(POST['username'])) && (/^[a-zA-Z0-9]*$/.test(POST['username']))) {
    console.log('username OK');
  } else {
    register_errors.push('Username must be between 4-10 characters, letters and numbers only');
  }
  // check for duplicate usernames
  var register_username = POST['username'].toLowerCase();
  if (user_data[register_username] != 'undefined') {
    register_errors.push('Username taken, please choose another one');
  } else {
    console.log('New username registered');
  }

  // validate password
  if (POST['password'].length < 6) {
    register_errors.push('Password too short, password length must be a minimum of 6 characters');
  } else {
    console.log('password OK');
  }

  // validate confirm password (make sure it matches)
  if (POST['password'] == POST['confirmpassword']) {
    console.log('password and confirm password OK');
  } else{
    register_errors.push('Please check that passwords match');
  }

  // validate full name
  if (/^[A-Za-z]+$/.test(POST['name']) || (POST['name'] != "undefined")) {
    console.log('full name OK');
  } else {
    register_errors.push('Please use letters only');
  }
  // validate email
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(POST['email'])) {
    console.log('email OK');
  } else {
    register_errors.push('Invalid email');
  }

// if everything's OK then register user
  if (register_errors.length == 0) { // no registration errors exist
    // add registered user data to file
    username = POST["username"];
    user_data[username] = {};
    user_data[username].name = username;
    user_data[username].password = POST['password'];
    user_data[username].email = POST['email'];

    data = JSON.stringify(user_data);
    fs.writeFileSync(filename, data, "utf-8");

    response.redirect('./invoice.html?' + stringified);
  } else {
    response.send("Sorry, try again");
  }
});

// process quantity form from lab13 info_server_ex4.js
app.post("/process_form", function (request, response) {
  console.log("Got POST process_form") // debug statement
  let POST = request.body;

  if (typeof POST['purchase_submit_button'] != 'undefined') {
    receipt = '';
    var stringified = queryString.stringify(POST);
    var has_quantities = true;
    var valid_quantities = false;
    for (i in products) {
      var q = POST[`quantity${i}`];
      var model = products[i]['type'];
      var model_price = products[i]['price'];
      has_quantities = has_quantities || q > 0;
      valid_quantities = has_quantities && isNonNegInt(q);
      }
      if (has_quantities && valid_quantities) {
        response.redirect("./invoice.html?" + stringified); // take user to invoice.html
      }
      else {
        receipt += `<h3><font color="red">${q} is not a valid quantity for ${model}!</font></h3>`;
      }
    
    
    //response.send(receipt);
    //response.end();
  }
}
);

// check for invalid inputs such as negative values or non integers
function isNonNegInt(stringToCheck, returnErrors = false) {
  errors = []; // assume no errors at first
  if (Number(stringToCheck) != stringToCheck) errors.push('Not a number!'); // Check if string is a number value
  if (stringToCheck < 0) errors.push('Negative value!'); // Check if it is non-negative
  if (parseInt(stringToCheck) != stringToCheck) errors.push('Not an integer!'); // Check that it is an integer

  return returnErrors ? errors : (errors.length == 0)
}

app.all('*', function (request, response, next) {
  response.send(request.method + ' to path ' + request.path);
  next();
});

app.listen(8080, () => console.log(`listening on port 8080`)); 