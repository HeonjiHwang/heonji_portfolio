const router = require("express").Router();
const pgDB = require("../db.js").pgClient;
const mailSender = require("../mailSender");
const {queryMapper} = require("./query.js");
const jwt = require("jsonwebtoken");

pgDB.init()
pgDB.connect();

router.get("/", (req, res)=>{
    res.send("Hello React x Node.js");
})

router.get("/getSNSData", (req, res)=>{

    let query = queryMapper.getSNSData(req.query);
    
    console.log("getSNSData > ");
    pgDB.sendQuery(query, (err, result)=>{
        if(err){
            console.error(err);
            res.send(err);
        }

        res.send({data:result.rows});
    });
});

router.get("/getSigninInfo", (req, res)=>{

    let query = queryMapper.getSigninInfo(req.query);

    console.log("getSigninInfo > ");
    pgDB.sendQuery(query, (err, result)=>{
        if(err){
            console.error(err);
            res.send(err);
            return;
        }
        
        let data = result.rows[0];
        
        //비밀번호 재설정 페이지로 리다이렉션 ㄱㄱ
        if(data.is_valid === 0)
            return;
        else{
            //비밀번호 재설정 페이지
            if(data.is_lock === 1 || data.pwd_remain <= 10){
                return;
            }

            //token 생성
            let {user_id, user_name, user_cd, email, phone_number} = data;
            let obj = {user_id:user_id, email:email, phone_number:phone_number, user_cd:user_cd, user_name:user_name};
            let token = jwt.sign({
                data : obj,
                exp : Math.floor(Date.now() / 1000) + (60*60)
            }, process.env.SECRET_KEY);

            res.send({token:token});
        }
    });
});

/**아이디 찾기*/
router.get("/getUserID", (req, res)=>{
    let query = queryMapper.getUserID(req.query);
    pgDB.sendQuery(query, (err, result)=>{
        if(err){
            console.error(err);
            res.send(err);
            return;
        }

    })
})

router.post("/sendMail", (req, res)=>{

});

module.exports = router;