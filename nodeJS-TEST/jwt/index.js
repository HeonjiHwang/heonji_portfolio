const jwt = require("jsonwebtoken");
require("dotenv").config();

let token = jwt.sign({
	user_id:"heonji95",
	exp:Math.floor(Date.now() / 1000) + (60*60),
}, process.env.SECRET_KEY);

console.log(token);
let result = jwt.verify(token, process.env.SECRET_KEY);
console.log(result);