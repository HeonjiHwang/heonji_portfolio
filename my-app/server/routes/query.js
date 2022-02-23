exports.queryMapper = {
    getUserID : ({user_name, user_email}) =>{
        return `
            SELECT user_cd, user_id FROM user_info 
            WHERE user_name = '${user_name}' AND email = '${user_email}'
        `;
    }
}