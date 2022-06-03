<template>
    <div class="wrapper">
        <div class='loginWrapper'>
            <div>
                <img src="@/assets/logo.png" width="200"/>
            </div>
            <div @keyup="onClickSignIn">
                <input type="text" class="user_id" placeholder="아이디"/>
                <input type="password" class="user_password" placeholder="패스워드"/>
            </div>
            <div>
                <button @click="onClickSignIn">로그인</button>
            </div>
            <div class="user-manage-wrapper">
                <a href="#">회원가입</a>
                <a href="#">아이디 찾기</a>
                <a href="#">비밀번호 찾기</a>
            </div>
        </div>
    </div>
</template>

<script setup>
/* eslint-disable */
import {computed, onBeforeMount} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import axios from 'axios';

const store = useStore();
const router = useRouter();
const userInfo = computed(() => store.getters['userStore/getUserInfo']);

onBeforeMount(() => {
    if(userInfo.value.user_cd){
        router.push({path:'mainHome'});
    }
})

function onClickSignIn(e){
    if(e.keyCode && e.keyCode != 13)
        return;
    let user_id = document.querySelector(".user_id").value;
    let user_pwd = document.querySelector(".user_password").value;
    let result = validation(user_id, user_pwd);

    if(result){
        axios.post("/signin", {user_id:user_id, user_pwd:user_pwd}).then(res => {
            let data = res.data;
            if(data.isSuccess){
                let result = data.data[0];
                let stData = {user_cd:result.user_cd, user_name:result.user_name, authority_id:result.authority_id, user_id:result.user_id, authority_name:result.authority_name};
                store.commit('userStore/setUserInfo', stData)
                router.push({path:'mainHome'});
            }else{
                alert(data.msg);
                return;
            }
        })
    }
}

function validation(user_id, user_pwd){
    if(user_id === ''){
        alert("아이디 확인!!");
        return false;
    }
    if(user_pwd === ''){
        alert("비밀번호 확인!!")
        return false;
    }
    return true;
}  
</script>

<style scoped>
    input:focus{
        outline:0px;
    }
    .wrapper{
        width:100vw;
        height:100vh;
        margin:0px;
        padding:0px;
        display: flex;
        align-items: center;
        background-color:#35495e;
    }
    .loginWrapper{
        width:500px;
        height:550px;
        margin:0 auto;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        border:7px solid #526f8d;
        border-radius:5px;
        background-color:#fff;
    }
    .loginWrapper > div{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding:0px 30px;
    }
    .loginWrapper > div > img{
        margin-bottom:20px;
    }
    .loginWrapper > div > input{
        height:33px;
        width:100%;
        margin:5px 0px;
        border:1px solid #a1a1a1;
        padding-left:5px;
        border-radius: 3px;
    }
    .loginWrapper > div > button{
        border-radius: 3px;
        height:40px;
        width:calc(100% + 10px);
        outline: 0px;
        border:1px solid #35495e;
        margin:10px 0px 5px 0px;
        background-color: #35495e;
        color:white;
        cursor:pointer;
    }
    .loginWrapper > div.user-manage-wrapper{
        flex-direction: row;
        justify-content: flex-end;
        font-size:12px;
        margin-top:7px;
    }
    .loginWrapper > div.user-manage-wrapper > a{
        margin-left:10px;
        text-decoration: none;
        color:inherit;
    }
</style>