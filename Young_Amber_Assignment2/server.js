// File copied from Lab 13 Bonus Exercise 5
var express = require('express');
var app = express(); // object to initialize express
var myParser = require("body-parser");
var data = require('./public/product_data.js'); // use data from product_data.js
var products = data.products;
var fs = require('fs');


app.use(express.static('./public'));
app.use(myParser.urlencoded({ extended: true }));

// function to process quantity form from lab13 info_server_ex4.js
function process_quantity_form(POST, response) {
  if (typeof POST['purchase_submit_button'] != 'undefined') {
    var contents = fs.readFileSync('./public/invoice.html', 'utf8');
    receipt = '';
    for (i in products) {
      let q = POST[`quantity_textbox${i}`];
      let model = products[i]['name'];
      let model_price = products[i]['price'];
      if (isNonNegInt(q)) {
        receipt += eval('`' + contents + '`'); // render template string
      }
      else {
        receipt += `<h3><font color="red">${q} is not a valid quantity for ${model}!</font></h3>`;
      }
    }
    response.send(receipt);
    response.end();
  }
}

app.post("/process_form", function (request, response) {
  console.log("Got POST process_form") // debug statement
  let POST = request.body;
  process_quantity_form(POST, response);
  //response.redirect('/invoice.html');
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

// check for valid quantities in textbox
function checkQuantityTextbox() {
  errs = isNonNegInt(quantity_form.quantity_textbox.value, true);
  quantity_textbox_message.innerHTML = errs.join(", ");
}

app.all('*', function (request, response, next) {
  response.send(request.method + ' to path ' + request.path);
  next();
});

app.listen(8080, () => console.log(`listening on port 8080`)); 