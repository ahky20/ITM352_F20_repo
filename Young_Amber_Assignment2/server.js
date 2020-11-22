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
  var uid = document.registration.userid;
  var passid = document.registration.passid;
  var uname = document.registration.username;
  var uadd = document.registration.address;
  var ucountry = document.registration.country;
  var uzip = document.registration.zip;
  var uemail = document.registration.email;
  var umsex = document.registration.msex;
  var ufsex = document.registration.fsex; if (userid_validation(uid, 5, 12)) {
    if (passid_validation(passid, 7, 12)) {
      if (allLetter(uname)) {
        if (alphanumeric(uadd)) {
          if (countryselect(ucountry)) {
            if (allnumeric(uzip)) {
              if (ValidateEmail(uemail)) {
                if (validsex(umsex, ufsex)) {
                }
              }
            }
          }
        }
      }
    }
  }
  return false;

} function userid_validation(uid, mx, my) {
  var uid_len = uid.value.length;
  if (uid_len == 0 || uid_len >= my || uid_len < mx) {
    alert("User Id should not be empty / length be between " + mx + " to " + my);
    uid.focus();
    return false;
  }
  return true;
}
function passid_validation(passid, mx, my) {
  var passid_len = passid.value.length;
  if (passid_len == 0 || passid_len >= my || passid_len < mx) {
    alert("Password should not be empty / length be between " + mx + " to " + my);
    passid.focus();
    return false;
  }
  return true;
}
function allLetter(uname) {
  var letters = /^[A-Za-z]+$/;
  if (uname.value.match(letters)) {
    return true;
  }
  else {
    alert('Username must have alphabet characters only');
    uname.focus();
    return false;
  }
}
function alphanumeric(uadd) {
  var letters = /^[0-9a-zA-Z]+$/;
  if (uadd.value.match(letters)) {
    return true;
  }
  else {
    alert('User address must have alphanumeric characters only');
    uadd.focus();
    return false;
  }
}
function countryselect(ucountry) {
  if (ucountry.value == "Default") {
    alert('Select your country from the list');
    ucountry.focus();
    return false;
  }
  else {
    return true;
  }
}
function allnumeric(uzip) {
  var numbers = /^[0-9]+$/;
  if (uzip.value.match(numbers)) {
    return true;
  }
  else {
    alert('ZIP code must have numeric characters only');
    uzip.focus();
    return false;
  }
}
function ValidateEmail(uemail) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (uemail.value.match(mailformat)) {
    return true;
  }
  else {
    alert("You have entered an invalid email address!");
    uemail.focus();
    return false;
  }
} function validsex(umsex, ufsex) {
  x = 0;

  if (umsex.checked) {
    x++;
  } if (ufsex.checked) {
    x++;
  }
  if (x == 0) {
    alert('Select Male/Female');
    umsex.focus();
    return false;
  }
  else {
    alert('Form Succesfully Submitted');
    window.location.reload()
    return true;
  }
}

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
        response.redirect("/invoice.html?" + stringified); // take user to invoice.html
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