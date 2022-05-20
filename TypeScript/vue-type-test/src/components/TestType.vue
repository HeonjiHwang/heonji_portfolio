<template>
    <div class="loginWrapper" @keyup="setUserInfo">
        <input type="text" class="user_id" placeholder="아이디"/>
        <input type="password" class="user_pwd" placeholder="비밀번호" />

        <button @click="signIn">로그인</button> <br><br>
    </div>
</template>

<script setup lang="ts">
import {UserInfo} from '../utils/userInfo';
import {useRouter} from 'vue-router';
import {useUserInfoStore} from '../store/UserInfoStore';

const router = useRouter();
const store = useUserInfoStore();
const userInfo = new UserInfo();

const signIn = () => {
    const id = (document.querySelector(".user_id") as HTMLInputElement).value;
    const pwd = (document.querySelector(".user_pwd") as HTMLInputElement).value;

    if(id === ''){
        alert('check your id field');
        return;
    }
    if(pwd === ''){
        alert('check your password field');
        return;
    }

    userInfo.SignIn({user_id:id, user_pwd:pwd});

    router.push({path:'/home'});
}
</script>

<style scoped>
.loginWrapper{
    margin:0 auto;
    display: flex;
    flex-direction: column;
    width:500px;
}
.loginWrapper input{
    border:1px solid #e4e4e4;
    height:32px;
    margin: 5px 0px;
}
.loginWrapper button {
    color:white;
    background-color:#41b883;
    border:1px solid #41b883;
    height:40px;
    margin: 5px 0px;
}
</style>