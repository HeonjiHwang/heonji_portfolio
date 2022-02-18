const crypto = require("crypto");
const {nanoid} = require("nanoid");

const createHashedPassword = (plainPassword)=>{
	
	return new Promise((resolve, reject)=>{
		let salt = nanoid(64);
		crypto.pbkdf2(plainPassword, salt, 8421, 64, 'sha512', (err, key)=>{
			if(err) reject(err);
			let obj = {password:key.toString('base64'), salt:salt};
			resolve(obj);
		})
	});
	
	return pwdInfo;
}
let salt = createHashedPassword('f3dtop0!')
salt.then((val)=>console.log(val));
/*
let pwd_salt = "dvEpEo0EXNOwwnMIjqf7UC3jKdkcnzOkoCvCXxbKfQOc4iRLlNhEkzui1R+iFKmPjjmmTI+3EjL8Py0WEC1meQ==";

const decryptPassword = (plainPassword, salt)=>{
	
	return new Promise((resolve, reject)=>{
		crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key)=>{
			if(err) return;
			let pwd = key.toString('base64');
			resolve(pwd);
		});
	});
}

let pwd = '9XyYNtDun15AT7ECn2p/D6h2t/aSlkf20bD8WmxC7afJ7FVnWk8S/e2A2rKL/Xf55KKsA+X1DbwIVBorTRlvVg==';
let result = decryptPassword('f3dtop0!', pwd_salt);
result.then((val)=>{
	if(pwd === val)
		console.log(true);
	else
		console.log(false);
});*/