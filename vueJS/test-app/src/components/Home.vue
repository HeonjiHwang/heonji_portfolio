
<template>
    <div class="contentWrapper">
        <div class="signinWrapper">
            <div class="logoWrapper">
                <img src="../assets/logo.png" alt="vueJS Logo"/>
            </div>
            <form>
                <div class="formField">
                    <input type="text" placeholder="아이디" v-model="user_id" ref="user_id"/>
                </div>
                <div class="formField">
                    <input type="password" placeholder="비밀번호" v-model="user_pwd" ref="user_pwd"/>
                </div>
            </form>
            <div class="btnWrapper">
                <button class="btn" @click="fnLogin">로그인</button>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default{
    data() {
        return{
            user_id: '',
            user_pwd: '',
            form:''
        }
    },
    methods:{

        fnLogin(){
            if(!this.user_id){
                alert("Check ID Field");
                this.$refs.user_id.focus();
                return;
            }
            if(!this.user_pwd){
                alert("Check Password Field");
                this.$refs.user_pwd.focus();
                return;
            }

            this.form = {
                user_id:this.user_id,
                user_pwd:this.user_pwd
            }
            
            this.$axios.post("http://localhost:3000/signin", this.form).then((res)=>{
                if(res.data.isSuccess){
                    alert("Success");
                }else{
                    alert("Fail");
                    this.resetValue();
                }
            }).catch((err)=>{
                alert("Fail");
                this.resetValue();
            })
        },
        resetValue(){
            this.user_id = '';
            this.user_pwd = '';
            this.form = '';
        }
    }
}
</script>

<style scoped>

ul, input {
  padding: 0;
}
li {
    list-style: none;
}
a {
  text-decoration: none;
  color:#444;
}

.contentWrapper{
    width:100%;
    height:100%;
    background-color:#f2f3f4;
    display:flex;
    justify-content: center;
    align-items: center;
}
.signinWrapper{
    width:450px;
    height:550px;
    display: flex;
    align-items:center;
    justify-content: center;
    flex-direction: column;
}
form{
    width:100%;
    margin-top:40px;
}
.formField{
    display:flex;
    justify-content: space-between;
    align-items: center;
    height:35px;
    margin-top:20px;
}
.formField > input{
    width:calc(100% - 10px);
    height:100%;
    padding-left:10px;
}
.btnWrapper{
    width:100%;
    height:35px;
    margin-top:20px;
}
.btnWrapper button.btn{
    width:100%;
    height:35px;
    outline:0px;
    background-color:#444;
    color:#fff;
    cursor:pointer;
}
</style>
