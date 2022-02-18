const router = require("express").Router();
const pgDB = require("../db.js").pgClient;

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
    
    console.log("getSNSData :: ");
    pgDB.sendQuery(query, (err, result)=>{
        if(err){
            console.error(err);
            res.send(err);
        }

        res.send({data:result.rows});
    });
})

module.exports = router;