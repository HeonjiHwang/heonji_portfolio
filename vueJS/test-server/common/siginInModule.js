const queryMapper = require("../db/queryMapper");

module.exports = {
    setSignInInfo(dbConn, {is_valid, is_lock, failed_count, user_cd}){
        //login 성공
        if(is_valid === 1 && is_lock === 0){
            let accessSQL = queryMapper.setSignInInfo(user_cd, ip);
            dbConn.query(accessSQL, (err, result) => {
                if(err){
                    console.error(err);
                    return;
                }
                console.log(result);
            })
        }
        //실패 -> cause : failed_count || pwd change date
        else if(is_valid === 0 && is_lock === 1){
            //비밀번호 재설정 및 찾기
        }
        //실패 -> cause : password incorrect
        else if(is_valid === 1 && is_lock === 0){
            let count = failed_count + 1;

        }
    },
    setAccessInfo(dbConn, {user_cd, action, page, ip}){
        
    }
}