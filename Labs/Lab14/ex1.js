var fs = require('fs'); // file system is built in to node

var filename = "user_data.json";

data = fs.readFileSync(filename, 'utf-8'); // 'utf-8' makes data readable to user
console.log("Success! We got: " + data)

user_data = JSON.parse(data);
console.log("User_data", user_data);
