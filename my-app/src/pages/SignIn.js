import {Axios} from '../utils/common.js';
import Encryption from '../utils/crypt.js'
import styled from 'styled-components';

const SignInWrapper = styled.div`
    width:100%;
    height:100%;
    background-color:#fff;
    display:flex;
    align-items:center;
    justify-content:center;
    user-select:none;
`;

const SignInContent = styled.div`
    width:470px;
    height:500px;
    border:1px solid #eaeaea;
    border-radius:10px;
    display:flex;
    flex-direction:column;
    padding:10px;
    align-items:center;
`;
const SiteTitleWrapper = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    margin-top:70px;

    img{
        border:2px solid #444;
        opacity:.85;
        width:30px;
    }
    span{
        font-weight:bold;
        display:block;
        margin-top:10px;
        font-size:30px;
        color:#444;
        border-bottom:1px solid #e4e4e4;
    }
`;
const SignInFormWrapper = styled.div`
    margin-top:90px;
    width:calc(100% - 40px);
`;
const SignInForm = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
`;
const Input = styled.input`
    width:calc(100% - 10px);
    height:40px;
    font-size:13px;
    border:1px solid #e4e4e4;
    border-radius:5px;
    outline:0px;
    margin-top:10px;
    padding-left:10px;

    &:focus{
        border:2px solid #444;
    }
`
const Button = styled.button`
    width:100%;
    height:45px;
    font-size:15px;
    border-radius:5px;
    border:0px;
    outline:0px;
    margin-top:30px;
    cursor:pointer;
    background-color:#46628d;
    color:white;
    transition-property:background-color;
    transition-duration:.5s;

    &:hover{
        background-color:#364f76;
    }
`;
const UserInfoWrapper = styled.div`
    width:calc(100% - 40px);
    display:flex;
    justify-content:flex-end;
    margin-top:10px;

    a{
        font-size:12px;
        color:#383838;
        text-decoration:none;
        margin-left:10px;
        padding-right:10px;
        border-right:1px solid #c7c2c2;
    }
    a:last-child{
        padding-right:0px;
        border-right:0px;
    }
`;

const SignIn = ()=>{
    const handleOnSignInKeyUp = (ev)=>{
        if(ev.keyCode === 13){
            handleSignInForm();
        }
    }
    const handleSignInForm = ()=>{
        let user_id = document.getElementById("user_id").value.replaceAll(" ", "");
        let user_pwd = document.getElementById("user_pwd").value.replaceAll(" ", "");

        if(user_id === "" || user_pwd === ""){
            window.confirm("아이디 혹은 비밀번호를 확인해주세요");
            return;
        }

        let txt = Encryption.encrypt(user_pwd);
        let param = {user_id:user_id, user_pwd:txt};
        
        Axios.get("/getSigninInfo", param).then((res)=>{
            if(res){
                let token = res.data.token;
                if(token){
                    window.localStorage.setItem("token", token);
                    window.location.href = "/home";
                }
            }
        }).catch(err=>{
            console.error(err);
        })

    }

    return(
        <SignInWrapper onKeyUp={handleOnSignInKeyUp}>
            <SignInContent>
                <SiteTitleWrapper>
                    <img src={require("../imgs/logo.png")} alt="logo"/>
                    <span>Heonji Portfolio</span>
                </SiteTitleWrapper>
                <SignInFormWrapper>
                    <SignInForm>
                        <Input id="user_id" type="text" autoComplete='off' placeholder='아이디'/>
                        <Input id="user_pwd" type="password" autoComplete='off' placeholder='비밀번호'/>
                        <Button onClick={handleSignInForm}>로그인</Button>
                    </SignInForm>
                </SignInFormWrapper>
                <UserInfoWrapper>
                    <a href="/find">아이디 찾기</a>
                    <a href="/find">비밀번호 찾기</a>
                    <a href="/">회원가입</a>
                </UserInfoWrapper>
            </SignInContent>
        </SignInWrapper>
    )
}

export default SignIn;