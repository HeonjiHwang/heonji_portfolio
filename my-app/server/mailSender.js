const nodemailer = require("nodemailer");

exports.mailSender = {
    sendMail:(to, verifyNum)=>{
        let html = `
            <div style="padding:20px;display:flex;align-items:center;justify-content:center;flex-direction:column;border:1px solid #e4e4e4;">
                <div style="border-bottom:1px solid #e4e4e4; padding:20px 0px;width:100%;">
                    <h2>Heonji Portfolio [인증번호]</h2>
                </div>
                <div style="padding:20px 0px;width:100%;text-align:center;">
                    <span>인증번호입니다.</span>
                    <div style="color:#fff;background-color:#6d94ae;width:20%;padding:5px;font-size:18px;text-align:center;margin:10px auto 0px;">
                        ${verifyNum}
                    </div>
                </div>
            </div>
        `;
        let option = {
            from : `[이메일 인증번호 안내] <${process.env.user}>`,
            to : to,
            subject : `[이메일 인증번호 안내]`,
            text : html,
            html : html
        }

        let transporter = nodemailer.createTransport({
            service:"gmail",
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            auth:{
                user:process.env.user,
                pass:process.env.pass
            }
        });
        
        transporter.sendMail(option, (err, info)=>{
            if(err){
                console.log(err);
                return false;
            }
            console.log(info.response);
            return true;
        })
    }
}