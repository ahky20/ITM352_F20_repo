var express = require('express');
var app = express();
var myParser = require("body-parser");
var fs = require('fs');
var filename = "user_data.json";

app.use(myParser.urlencoded({ extended: true }));
if(fs.existsSync(filename)) {
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
    user_name_from_form = POST["username"]; // gets the username input 
    password_from_form = POST['password']; // gets the password input
    console.log("User name from form=" + user_name_from_form);
    if (user_data[user_name_from_form] && user_data[password_from_form] != undefined)
    {
        response.send(`<H3> User ${POST[username]} logged in`);
    } else 
    {
            response.send(`Sorry Buddy`)
    }
});

app.listen(8080, () => console.log(`listening on port 8080`));