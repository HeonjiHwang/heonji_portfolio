exports.queryMapper = {
    getSigninInfo : ({user_pwd, user_id})=>{
        return `
            SELECT CASE WHEN failed_count >= 3 THEN 1
            WHEN EXTRACT('day' FROM now() - ui.pw_changed_time) > 90 THEN 1    
            ELSE 0 END is_lock,
            CASE WHEN failed_count < 3 AND encode(sha256('${decodeURIComponent(user_pwd)}'::bytea), 'hex') = ui.user_pwd THEN 1 ELSE 0 END is_valid,
            failed_count , user_cd, user_id, user_name, phone_number, email,
            last_login_time, last_login_ip,
            CAST(90 - EXTRACT('day' FROM now() - ui.pw_changed_time) AS Integer) pwd_remain
            FROM user_info ui
            WHERE ui.user_id = '${decodeURIComponent(user_id)}'
        `;
    },
    getUserID : ({user_name, user_email}) =>{
        return `
            SELECT user_cd, user_id FROM user_info 
            WHERE user_name = '${decodeURIComponent(user_name)}' AND email = '${decodeURIComponent(user_email)}'
        `;
    },
    checkUser : ({user_name, user_id, user_email})=>{
        return `
            SELECT CASE WHEN count(*) >= 1 THEN TRUE ELSE FALSE END AS is_verify FROM user_info 
            WHERE user_id = '${decodeURIComponent(user_id)}' AND user_name = '${decodeURIComponent(user_name)}' AND email = '${decodeURIComponent(user_email)}'
        `;
    },
    getSNSData : ({user_cd})=>{
        return `
            SELECT sd.id, sd.user_cd, ui.user_id, sd.picture, sd.text, COALESCE(a.user_cds, '') user_cds, COALESCE(a.is_good_count, 0) is_good_count, 
            CASE WHEN b.friend_user_cd IS NOT NULL OR sd.user_cd=${decodeURIComponent(user_cd)} THEN TRUE ELSE FALSE END AS is_friend,
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
                SELECT friend_user_cd, user_cd FROM user_friend_map WHERE user_cd = ${decodeURIComponent(user_cd)}
            )b
            ON b.friend_user_cd = sd.user_cd
            ORDER BY create_time desc
        `;
    },
}