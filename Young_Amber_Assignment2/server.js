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

// register form validation code from w3resource
function formValidation() {
  var userid = document.registration.userid;
  var passid = document.registration.passid;
  var confirmpassid = document.registration.confirmpassid;
  var username = document.registration.username;
  var useremail = document.registration.email;

  if (userid_validation(userid, 4, 10)) { // usernames should be between 4-10 characters
    if (passid_validation(passid, 6, 12)) { // passwords should be between 6-12 characters
      if (confirm_passid(confirmpassid == passid)) {
        if (allLetter(username, 1, 30)) { // full names should not be more than 30 characters
          if (ValidateEmail(useremail)) {
          } else {
            alert('Form Succesfully Submitted');
            window.location.reload()
            return true;
          }
        }
      }
    }
  }
}
return false;
// validate username
 function userid_validation(userid, mx, my) {
  var userid_len = userid.value.length;
  if (userid_len == 0 || userid_len >= my || userid_len < mx) {
    alert("User Id should not be empty / length be between " + mx + " to " + my);
    userid.focus();
    return false;
  }
  return true;
}
// validate password
function passid_validation(passid, mx, my) {
  var passid_len = passid.value.length;
  if (passid_len == 0 || passid_len >= my || passid_len < mx) {
    alert("Password should not be empty / length be between " + mx + " to " + my);
    passid.focus();
    return false;
  }
  return true;
}
// validate confirm password
function confirm_passid(confirmpassid) {
  if (confirmpassid != passid) {
    alert("Passwords must match");
    confirmpassid.focus();
    return false;
  }
  return true;
}
// validate fullname
function allLetter(username) {
  var letters = /^[A-Za-z]+$/;
  if (username.value.match(letters)) {
    return true;
  }
  else {
    alert('Username must have alphabet characters only');
    username.focus();
    return false;
  }
}

// validate email
function ValidateEmail(useremail) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (useremail.value.match(mailformat)) {
    return true;
  }
  else {
    alert("You have entered an invalid email address!");
    useremail.focus();
    return false;
  }
}
  


app.post("")

app.post("/process_order", function (request, response) {
  console.log("Got POST process_order") // debug statement
  let POST = request.body;
  process_quantity_form(POST, response);
  //response.redirect("/invoice.html");
}
);

// function to process quantity form from lab13 info_server_ex4.js
function process_quantity_form(POST, response) {
  if (typeof POST['purchase_submit_button'] != 'undefined') {
    //var contents = fs.open('./public/invoice.html', 'utf8');
    receipt = '';
    for (i in products) {
      let q = POST[`quantity${i}`];
      let model = products[i]['type'];
      let model_price = products[i]['price'];
      if (isNonNegInt(q)) {
        stringified = queryString.stringify(request.body);
        response.redirect("./invoice.html?" + stringified); // take user to invoice.html
      }
      else {
        receipt += `<h3><font color="red">${q} is not a valid quantity for ${model}!</font></h3>`;
      }
    }
    response.send(receipt);
    //response.end();
  }
}

// check for invalid inputs such as negative values or non integers
function isNonNegInt(stringToCheck, returnErrors = false) {
  errors = []; // assume no errors at first
  if (Number(stringToCheck) != stringToCheck) errors.push('Not a number!'); // Check if string is a number value
  if (stringToCheck < 0) errors.push('Negative value!'); // Check if it is non-negative
  if (parseInt(stringToCheck) != stringToCheck) errors.push('Not an integer!'); // Check that it is an integer

  return returnErrors ? errors : (errors.length == 0)
}

// check for valid quantities in textbox
function checkQuantityTextbox() {
  errs = isNonNegInt(order_form.quantity.value, true);
  quantity.innerHTML = errs.join(", ");
}

app.all('*', function (request, response, next) {
  response.send(request.method + ' to path ' + request.path);
  next();
});

app.listen(8080, () => console.log(`listening on port 8080`)); 