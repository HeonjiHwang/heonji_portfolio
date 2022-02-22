const nodemailer = require("nodemailer");

exports.mailSender = {
    setOption:(to, verifyNum)=>{
        let html = `
            <div style="padding:20px;display:flex;flex-direction:column;border:1px solid #e4e4e4;align-items:center;justify-content:center;">
                <div style="border-bottom:1px solid #e4e4e4; padding:20px 0px;width:100%;">
                    <h2>Heonji Portfolio [인증번호]</h2>
                </div>
                <div style="padding:20px 0px;width:100%">
                    <span>인증번호입니다.</span>
                    <div style="color:#fff;background-color:#6d94ae">
                        ${verifyNum}
                    </div>
                </div>
            </div>
        `;
        return {
            from : `[이메일 인증번호 안내] <${process.env.user}>`,
            to : to,
            subject : `[이베일 인증번호 안내]`,
            html : html
        }
    },
    sendMail:(to, verifyNum)=>{
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
        
        transporter.sendMail(this.setOption(to, verifyNum), (err, info)=>{
            if(err){
                console.log(err);
                return false;
            }
            console.log(info.response);
            return true;
        })
    }
}