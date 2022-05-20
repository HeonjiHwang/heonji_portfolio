export interface User{
    user_id:string;
    user_cd:number;
    user_name:string;
    authority_id:number;
    authority_name:string;

    getUserInfo():object;
    setUserInfo(data:object):void;
    SignOut():object;
    SignIn(data:object):void
}