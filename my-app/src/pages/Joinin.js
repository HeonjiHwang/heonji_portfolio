import {Axios} from '../utils/common.js';
import styled from 'styled-components';

const JoinFrom = styled.div`
    display;flex;
    flex-direction:column;
    width:340px;
    height:auto;
    margin:10px auto;
    
    label{
        font-size:13px;
        margin-bottom:10px;
    }
    input{
        width:100%;
        height:34px;
        border:1px solid #ccc;
        outline:0px;
        padding:0px 10px;
    }
    input:focus{
        border:2px solid #444;
    }
`;

const Joinin = ()=>{
    return (
        <>
            <JoinFrom>
                <label>아이디</label>
                <input type="text" id="user_id"/>

                <label>비밀번호</label>
                <input type="password" id="user_pwd"/>

                <label>비밀번호 확인</label>
                <input type="password" id="user_pwd_confirm"/>

                <label>이름</label>
                <input type="text" id="user_name"/>

                <label>본인확인용 이메일(선택)</label>
                <input type="text" id="user_email"/>
                
                <label>휴대전화 번호</label>
                <input type="text" id="user_mobile"/>
            </JoinFrom>
        </>
    )
}

export default Joinin;