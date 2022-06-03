
module.exports = {
    getSignInfo({user_id, user_pwd}){
        return `
            SELECT CASE WHEN failed_count > 5 THEN 1
            WHEN DATEDIFF(pwd_changed_time, now()) > 90 THEN 1    
            ELSE 0 END is_lock,
            CASE WHEN failed_count < 6 AND '${user_pwd}' = ui.user_pwd THEN 1 ELSE 0 END is_valid,
            failed_count , user_cd, user_id, user_name, ui.authority_id, ai.authority_name, phone_num, email,
            last_login_time, last_login_ip,
            90 - DATEDIFF(pwd_changed_time, now()) pwd_remain
            FROM user_info ui
            inner join authority_info ai 
            on ai.authority_id = ui.authority_id 
            WHERE ui.user_id = '${user_id}'
        `;
    },
    setSignInInfo({user_cd, ip}){
        return `
            update user_info set last_login_time = now(), last_login_ip = '${ip}' where user_cd = ${user_cd}
        `;
    },
    setSignInFailedCount({count}){
        return `
            update user_info set failed_count = ${count};
        `;
    },
    setAccessInfo({user_cd, action, page, ip}){
        return `
            INSERT INTO testdb.user_access_info
            (user_cd, action, page, access_time, access_ip)
            VALUES(${user_cd}, '${action}', '${page}', now(), '${ip}');
        `;
    }
}