import {defineStore} from 'pinia';

type user = {
    user_id:string,
    user_cd:number,
    authority_id:number,
    authority_name:string
}

export const useUserInfoStore = defineStore('app', {
    state : () => ({
        user_id : '',
        user_cd : null,
        authority_id : null,
        authority_name : ''
    }),
    getters:{
        getUserInfo(state){
            return { user_id : state.user_id, user_cd : state.user_cd, authority_id : state.authority_id, authority_name : state.authority_name }
        }
    },
    actions:{
        setUserInfo(state:any, data:user){
            state.user_id = data.user_id;
            state.user_cd = data.user_cd;
            state.authority_id = data.authority_id;
            state.authority_name = data.authority_name;
        }
    }
})