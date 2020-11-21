// File copied from Lab 13 Bonus Exercise 5
var express = require('express');
var app = express(); // object to initialize express
var myParser = require("body-parser");
var data = require('./public/product_data.js'); // use data from product_data.js
var products = data.products;
var fs = require('fs');
var filename = "user_data.json";

app.use(express.static('./public'));
app.use(myParser.urlencoded({ extended: true }));

// function to process quantity form from lab13 info_server_ex4.js
function process_quantity_form(POST, response) {
  if (typeof POST['purchase_submit_button'] != 'undefined') {
    var contents = fs.readFileSync('./public/invoice.html', 'utf8');
    receipt = '';
    for (i in products) {
      let q = POST[`quantity${i}`];
      let model = products[i]['type'];
      let model_price = products[i]['price'];
      if (isNonNegInt(q)) {
        response.redirect("/process_form"); // take user to invoice.html
      }
      else {
        receipt += `<h3><font color="red">${q} is not a valid quantity for ${model}!</font></h3>`;
      }
    }
    //response.send(receipt);
    //response.end();
  }
}

app.post("/process_form", function (request, response) {
  console.log("Got POST process_form") // debug statement
  let POST = request.body;
  process_quantity_form(POST, response);
  response.redirect("login");
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

// code from lab14 ProcessLogin.js
app.use(myParser.urlencoded({ extended: true }));
if (fs.existsSync(filename)) {
  data = fs.readFileSync(filename, 'utf-8'); // 'utf-8' makes data readable to user
  //console.log("Success! We got: " + data)

  user_data = JSON.parse(data);
  console.log("User_data=", user_data);
} else {
  console.log("Sorry can't read file " + filename);
}

app.get("/login", function (request, response) {
  // Give a simple login form
  str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
  response.send(str);
});

app.post("/login", function (request, response) {
  // Process login form POST and redirect to logged in page if ok, back to login page if not
  console.log("Got a POST login request");
  POST = request.body;
  user_name_from_form = POST["username"];
  console.log("User name from form=" + user_name_from_form);
  if (user_data[user_name_from_form] != undefined) {
    response.send(`<H3> User ${POST[username]} logged in`);
  } else {
    response.send(`Sorry Buddy`)
  }
  
  app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
    <body>
    <form action="" method="POST">
    <input type="text" name="username" size="40" placeholder="enter username" ><br />
    <input type="password" name="password" size="40" placeholder="enter password"><br />
    <input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
    <input type="email" name="email" size="40" placeholder="enter email"><br />
    <input type="submit" value="Submit" id="submit">
    </form>
    </body>
        `;
    response.send(str);
  });

  app.post("/register", function (request, response) {
    // process a simple register form
    POST = request.body;
    console.log("Got register POST");
    if (POST["username" != undefined] && POST['password' != undefined] && POST['repeat_password' != undefined]) { // Validate user input
      username = POST["username"];
      user_data[username] = {};
      user_data[username].name = username;
      user_data[username].password = POST['password'];
      user_data[username].email = POST['email'];

      data = JSON.stringify(user_data);
      fs.writeFileSync(filename, data, "utf-8");

      response.send("User " + username + " logged in");
    } else {
      response.send("Sorry, try again");
    }
  });
});

app.listen(8080, () => console.log(`listening on port 8080`)); 