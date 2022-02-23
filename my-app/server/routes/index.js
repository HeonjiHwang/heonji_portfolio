const router = require("express").Router();
const pgDB = require("../db.js").pgClient;
const mailSender = require("../mailSender");
const queryMapper = require("./query.js");
const jwt = require("jsonwebtoken");

pgDB.init()
pgDB.connect();

router.get("/", (req, res)=>{
    res.send("Hello React x Node.js");
})

router.get("/getSNSData", (req, res)=>{
    let {user_cd} = req.query;

    let query = `
        SELECT sd.id, sd.user_cd, ui.user_id, sd.picture, sd.text, COALESCE(a.user_cds, '') user_cds, COALESCE(a.is_good_count, 0) is_good_count, 
        CASE WHEN b.friend_user_cd IS NOT NULL OR sd.user_cd=${user_cd} THEN TRUE ELSE FALSE END AS is_friend,
        to_char(sd.create_time, 'YYYY-MM-DD HH24:MI:SS') create_time, to_char(sd.update_time, 'YYYY-MM-DD HH24:MI:SS') update_time FROM sns_data sd
        INNER JOIN user_info ui
        ON ui.user_cd = sd.user_cd
        LEFT OUTER JOIN (
            SELECT igs.sns_id, string_agg(user_cd::TEXT, ',') AS user_cds, count(*) AS is_good_count FROM is_good_info igs
            GROUP BY igs.sns_id
            ORDER BY sns_id
        )a
        ON sd.id = a.sns_id
        LEFT OUTER JOIN (
            SELECT friend_user_cd, user_cd FROM user_friend_map WHERE user_cd = ${user_cd}
        )b
        ON b.friend_user_cd = sd.user_cd
        ORDER BY create_time desc
    `;
    
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
    let {user_pwd, user_id} = req.query;

    let query = `
        SELECT CASE WHEN failed_count >= 3 THEN 1
        WHEN EXTRACT('day' FROM now() - ui.pw_changed_time) > 90 THEN 1    
        ELSE 0 END is_lock,
        CASE WHEN failed_count < 3 AND encode(sha256('${user_pwd}'::bytea), 'hex') = ui.user_pwd THEN 1 ELSE 0 END is_valid,
        failed_count , user_cd, user_id, user_name, phone_number, email,
        last_login_time, last_login_ip,
        CAST(90 - EXTRACT('day' FROM now() - ui.pw_changed_time) AS Integer) pwd_remain
        FROM user_info ui
        WHERE ui.user_id = '${user_id}'
    `;

    console.log("getSigninInfo > ");
    pgDB.sendQuery(query, (err, result)=>{
        if(err){
            console.error(err);
            res.send(err);
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
    console.log(queryMapper);
    let query = queryMapper.getUserID(req.query);
    console.log(query);
})

router.post("/sendMail", (req, res)=>{

});

module.exports = router;