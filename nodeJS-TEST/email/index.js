const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
	service:'gmail',
	host:'smtp.gmail.com',
	port:587,
	secure:false,
	auth:{
		user:"hg.hwang@rtnet.co.kr",
		pass:"ghkdwl1995@@"
	}
});

let info = transporter.sendMail({
	from:`"SEND MAIL TEST" <hg.hwang@rtnet.co.kr>`,
	to:'dalsae95@gmail.com',
	subject:"SEND MAIL TEST",
	text:'test',
	html:`<b>test</b>`
}, (err, info)=>{
	if(err)
		console.log(err);
	else
		console.log(info.response);
});