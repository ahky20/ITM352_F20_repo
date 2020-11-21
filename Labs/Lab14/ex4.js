var fs = require('fs'); // file system is built in to node

var filename = "user_data.json";

data = fs.readFileSync(filename, 'utf-8'); // 'utf-8' makes data readable to user
user_data = JSON.parse(data);

username= 'newuser';
user_data[username] = {};
user_data[username].name = "Jow Schmo";
user_data[username].password = "pass";
user_data[username].email = "joe@jot.com";

data = JSON.stringify(user_data);
fs.writeFileSync(filename, data, "utf-8");
