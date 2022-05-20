import {User} from './interface/User'

type userData = {
    user_id:string;
    user_name:string;
    authority_id:number;
    authority_name:string;
    user_pwd:string;
}

type signInData = {
    user_id:string,
    user_pwd:string
}

type test = {
    user_name:string,
    authority_id:number,
    authority_name:string
}

export class UserInfo implements User{
    //public
    user_id: string = '';
    user_name: string = '';
    user_cd: number = 0;
    authority_id: number = 0;
    authority_name: string = '';

    //private
    private _user_pwd:string = '';

    setUserInfo(data: userData): void {
        this.user_cd++;
        this.user_id = data.user_id;
        this.user_name = data.user_name;
        this.authority_id = data.authority_id;
        this.authority_name = data.authority_name;
        this._user_pwd = data.user_pwd;
    }

    getUserInfo(): object {
        return {
            user_id : this.user_id,
            user_name : this.user_name,
            user_cd : this.user_cd,
            authority_id : this.authority_id,
            authority_name : this.authority_name
        };
    }

    SignIn(data:signInData):void{
        this.setUserInfo({...this.SignInTest(), ...data});
    }

    //test용
    SignInTest():test{
        return {
            user_name : 'heonji',
            authority_id : 1,
            authority_name: 'system'
        }
    }

    SignOut():object {
        this.user_id = '';
        this.user_name = '';
        this.authority_id = 0;
        this.authority_name = '';
        this._user_pwd = '';

        return {isSuccess:true};
    }
}

export class Encryption {

}