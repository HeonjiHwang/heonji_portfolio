const queryMapper = require("../db/queryMapper");

module.exports = {
    setSignInInfo(dbConn, {is_valid, is_lock, failed_count, user_cd, ip}){

        return new Promise((resolve) => {
            //login 성공
            if(is_valid === 1 && is_lock === 0){
                let sql = queryMapper.setSignInInfo({user_cd, ip});
                let returnVal = {};
                dbConn.query(sql, (err) => {
                    if(err){
                        console.error(err);
                        resolve({isOK:false, msg:'db error'});
                    }
                    resolve({isOK : true, flag:'L'});
                });
            }
            //실패 -> cause : failed_count || pwd change date
            else if(is_valid === 0 && is_lock === 1){
                if(failed_count > 5){
                    resolve({isOK:false, msg:'비밀번호 잠김. 실패 횟수 5번 초과', flag:'F'})
                }else{
                    resolve({isOK:false, msg:'비밀번호 변경 필요', flag:'F'})
                }
            }
            //실패 -> cause : password incorrect
            else if(is_valid === 1 && is_lock === 0){
                let count = failed_count + 1;
                let sql = setSignInFailedCount({count});
                let returnVal = {};
                dbConn.query(sql, (err, result) => {
                    if(err){
                        console.error(err);
                        resolve({isOK:false, msg:'db error'});
                    }
                    resolve({isOK:false, msg:'비밀번호 틀림. 5번 초과 틀릴 시 비밀번호 잠김', flag:'F'});
                })
            }
        })
    },
    setAccessInfo(dbConn, {user_cd, action, page, ip}){
        let sql = queryMapper.setAccessInfo({user_cd, action, page, ip});
        dbConn.query(sql, (err, result) => {
            if(err){
                console.error(err);
                return;
            }
            // console.log(result);
        })
    }
}