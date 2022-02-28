import {useState} from 'react';
import {Axios} from '../utils/common.js';
import styled from 'styled-components';

const FindUserInfoWrapper = styled.div`
    width:100%;
    height:100%;
    background-color:#fff;
    display:flex;
    align-items:center;
    justify-content:center;
    user-select:none;
    flex-direction:column;
`;
const FindUserInfoTab = styled.div`
    width:492px;
    height:34px;
    display:flex;
    flex-direction:row;
    align-items:flex-end;

    div{
        margin-right:10px;
        border-bottom:2px solid #ccc;
        font-size:13px;
        padding:10px 5px;
        cursor:pointer;
        width:50%;
        text-align:center;
    }
    div:last-child{
        margin-right:0px;
    }
    div.active{
        border-bottom:2px solid #6d94ae;
    }
`;
const FindUserInfoContentWrapper = styled.div`
    width:470px;
    height:500px;
    border:1px solid #eaeaea;
    display:flex;
    flex-direction:column;
    padding:10px;
    align-items:center;
`;

const FindUserInfoContent = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;

    h1{
        display:flex;
        font-size:25px;
        font-weight:bold;
        height:30%;
        align-items:center;
        justify-content:center;
        border-bottom:1px solid #e4e4e4;
    }
    div{
        height:70%;
        width:100%;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
    }
`;

const Input = styled.input`
    width:calc(100% - 30px);
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
`;

const Button = styled.button`
    width:calc(100% - 20px);
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

const FindedIDListWraper = styled.div`
    width:calc(100% - 20px);
    padding:0px 10px;
    margin-top:30px;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
`;

const FindUserInfo = ({path})=>{
    const [currentTab, setCurrentTab] = useState(path)
    let arr = [{id:"findID", text:"아이디 찾기"}, {id:"findPwd", text:"비밀번호 찾기"}];

    const handleOnClickTab = (id)=>{
        setCurrentTab(id);
    }
    return (
        <FindUserInfoWrapper>
            <FindUserInfoTab>
                {
                    arr.map((val, idx)=>{
                        return(
                            <Tab handleOnClickTab={()=>handleOnClickTab(val.id)} key={idx} currentTab={currentTab} tabID={val.id}>{val.text}</Tab>
                        )
                    })
                }
            </FindUserInfoTab>
            <FindUserInfoContentWrapper>
                <TabContent currentTab={currentTab}/>
            </FindUserInfoContentWrapper>
        </FindUserInfoWrapper>
    )
}

const Tab = ({currentTab, tabID, children, handleOnClickTab})=>{
    return(
        <div id={tabID} onClick={handleOnClickTab} className={tabID === currentTab ? 'active' : 'inactive'}>
            {children}
        </div>
    )
}

const TabContent = ({currentTab})=>{

    return(
        <FindUserInfoContent id={currentTab + "-content"}>
            <h1>{currentTab === "findID" ? "아이디 찾기" : "비밀번호 찾기"}</h1>
            <div>
                {
                    currentTab === "findID" ? <FindIDForm/> : <FindPwdForm/>
                }
            </div>
        </FindUserInfoContent>
    )
}

const FindIDForm = ()=>{
    const [isFind, setIsFind] = useState(false);
    const [isShow, setIsShow] = useState(true);
    const [findIDList, setFindIDList] =  useState([]);

    const handleOnClickFindID = ()=>{
        let name = document.getElementById("user_name").value;
        let email = document.getElementById("user_email").value;
        let param = {user_name:name, user_email:email};

        Axios.get("/getUserID", param).then((res)=>{
            if(res && res.data.data.length > 0){
                let data = res.data.data;
                setFindIDList(data);
                setIsShow(false);
                setIsFind(true);
            }else{
                alert("고객님의 정보와 일치하는 아이디가 없습니다.");
                document.getElementById("user_name").value = "";
                document.getElementById("user_email").value = "";
            }
        }).catch(err=>{
            console.error(err);
        })
    }

    const handleOnClickRedirectSignInBtn = ()=>{
        window.location.href = "/";
    }
    return(
        <>
            {
                isShow ? 
                <>
                <Input type="text" id="user_name" placeholder="이름" autoComplete='off'/>
                <Input type="text" id="user_email" placeholder="이메일" autoComplete='off'/>
                <Button onClick={handleOnClickFindID}>아이디 찾기</Button>
                </>
                : isFind ? 
                <div>
                <p>고객님의 정보와 일치하는 아이디 목록입니다.</p>
                <FindedIDListWraper>
                    {
                        findIDList.length > 0 && findIDList.map((val)=>{
                            return(
                                <p key={val.user_cd}>{val.user_id}</p>
                            )
                        })
                    }
                </FindedIDListWraper>
                <Button onClick={handleOnClickRedirectSignInBtn}>로그인</Button>
                </div>
                :
                <>
                </>
            }
            
        </>
    )
}

const FindPwdForm = ()=>{
    const [isVerify, setIsVerify] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    const handleOnClickVerify = ()=>{
        if(!isVerify){
            
            let user_id = document.getElementById("user_id").value;
            let user_name = document.getElementById("user_name").value;
            let user_email = document.getElementById("user_email").value;
            let is_verify = false;

            //사용자확인
            let param = {user_id:user_id, user_name:user_name, user_email:user_email};
            
            Axios.get("/checkUser", param).then((res)=>{
                if(res && res.data.length > 0){
                    setIsVerify(res.data[0].is_verify);
                    is_verify = res.data[0].is_verify;
                    
                    //메일보내기
                    Axios.post("/sendMail", param).then((res)=>{

                    }).catch(err=>{
                        console.log(err);
                    })

                }else{
                    alert("고객님의 정보와 일치하는 아이디가 없습니다.");
                    document.getElementById("user_id").value = "";
                    document.getElementById("user_name").value = "";
                    document.getElementById("user_email").value = "";
                }
            }).catch(err=>{
                console.error(err);
            })
        }else{
            //여기서 인증확인
            setIsVerify(false);
            setIsAuth(true);
        }
    }

    const handleOnClickChangePass = ()=>{
        setIsAuth(false);
    }

    return(
        <>
            {
                !isAuth ? 
                <>
                <Input type="text" id="user_name" placeholder="이름" autoComplete='off'/>
                <Input type="text" id="user_id" placeholder="아이디" autoComplete='off'/>
                <Input type="text" id="user_email" placeholder="이메일" autoComplete='off'/>
                {
                    isVerify && <Input type="text" placeholder="인증번호" autoComplete='off'/>
                }
                <Button onClick={handleOnClickVerify}>{isVerify ? "인증 확인" : "인증번호 전송"}</Button>
                </> 
                :
                <>
                <Input type="password" placeholder="새 비밀번호"/>
                <Input type="password" placeholder="비밀번호 확인"/>
                <Button onClick={handleOnClickChangePass}>비밀번호 변경</Button>
                </>
            }
        </>
    )
}

export default FindUserInfo;