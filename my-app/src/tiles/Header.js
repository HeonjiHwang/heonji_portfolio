import {useState} from 'react';
import alarm from '../imgs/alarm.png';
import menuToggle from '../imgs/menuToggle.png';
import profile from '../imgs/profile.png';
import add from '../imgs/add.png';
import search from '../imgs/search.png';
import home from '../imgs/home.png';
import logo from '../imgs/logo.png';
import logout from '../imgs/logout.png';
import styled, {keyframes} from 'styled-components';

const FadeIn = keyframes`
    from{
        opacity:0;
    }
    to{
        opacity:1;
    }
`;
const FadeOut = keyframes`
    from{
        opacity:1;
    }
    to{
        opacity:0;
    }
`;

const HeaderWrapper = styled.div`
    width:100%;
    height:45px;
    background-color:#fff;
    border-bottom:1px solid #e4e4e4;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
`;

const HeaderLeftWrapper = styled.div`
    width:auto;
    height:100%;
    display:flex;
    align-items:center;
    cursor:pointer;
    margin-left:10px;

    img{
        height:25px;
        opacity:0.9;
        border:2px solid #e4e4e4;
    }
    span{
        margin-left:5px;
        font-size:13px;
        font-weight:100;
        color:#444;
        user-select:none;
    }
`;

const HeaderRightWrapper = styled.ul`
    width:auto;
    height:100%;
    display:flex;
    flex-direction:row;
    align-items:center;
    margin-right:10px;
    user-select:none;

    .top-right-image{
        padding:0px 8px;
    }

    li > .active{
        opacity:1;
    }
`;

const HeaderRightTopImage = styled.img`
    src:${(props)=>props.src};
    width:25px;
    height:25px;
    opacity:0.5;
    cursor:pointer;

    &:hover{
        opacity:1;
    }
`;

const DropdownMenuOverlay = styled.div`
    position:absolute;
    width:100%;
    height:${props=>props.isOpen ? "calc(100% - 45px)" : "0%"};
    bottom:0px;
    left:0px;
    background:#0000006b;
    overflow:hidden;
    opacity:1;

    animation-duration:0.5s;
    animation-timing-function:ease-out;
    animation-name:${props=>props.isOpen ? FadeIn : FadeOut};
`;
const DropDownMenuToggle = styled.div`
    z-index:1;
    position:absolute;
    right:0px;
    background-color:#fff;
    width:200px;
    height:${props=>props.isOpen ? "100%" : "0%"};
    padding:10px;
    
    transition-property:height;
    transition-duration:.5s;
    
    ul > li{
        padding:10px 5px;  
        font-size:14px;
        cursor:pointer;
        display:flex;
        flex-direction:row;
        align-items:center;
    }
    ul > li:hover{
        background-color:#f2f3f4;
    }
    ul > li > a{
        display:block;
    }
    ul > li > img{
        width:20px;
        height:20px;
        margin-right:10px;
    }
    ul > li > hr{
        border:1px solid #e4e4e4;
    }
`;

const DropDownAlarmWrapper = styled.div`
    position:absolute;
    top:50px;
    right:120px;
    width:250px;
    height:auto;
    padding:25px 10px 10px;
    background-color:#fff;
    border:1px solid #e4e4e4;
    border-radius:10px;

    ul{
        max-height:150px;
        overflow:auto;
    }
    ul::-webkit-scrollbar{
        width:5px;
    }
    ul::-webkit-scrollbar-track{
        background-color:#fff;
    }
    ul::-webkit-scrollbar-thumb{
        background-color:#444;
        border-radius:50px;
    }
    ul > li{
        display:block;
        padding:5px 15px 5px 5px;
        border-bottom:1px solid #e4e4e4;
        font-size:13px;
        cursor:pointer;
    }
    ul > li:hover{
        background-color:#f2f3f4;
    }
    ul > li:last-child{
        border-bottom:0px;
    }
    ul > li > span{
        display:block;
        text-align:right;
        margin-top:5px;
        font-size:11px;
    }
`;

const CloseAlarmButton = styled.button`
    position:absolute;
    top:5px;
    right:5px;
    font-size:13px;
    font-weight:bold;
    color:#d5d5d5;
    background:transparent;
    border:0px;
    outline:0px;
    cursor:pointer;

    &:hover{
        color:inherit;
    }
`;

const Header = ()=>{
    return(
        <HeaderWrapper>
            <HeaderLeftWrapper>
                <LeftLogo/>
            </HeaderLeftWrapper>
            <HeaderRightWrapper>
                <RightNav/>
            </HeaderRightWrapper>
        </HeaderWrapper>
    )
}

const LeftLogo = ()=>{
    return(
        <>
            <img src={logo} alt="logo"/>
            <span>heonJi portfolio</span>   
        </>
    )
}

const RightNav = ()=>{
    const rightTopMenu = [home, add, alarm, search, profile, menuToggle];
    const rightTopAlt = ["home", "add", "alarm", "search", "profile", "menuToggle"];
    const [clickValue, setClickValue] = useState("home");
    const [isOpen, setIsOpen] = useState(false);
    const [isAlarm, setIsAlarm] = useState(false);

    const handleImageClick = (ev)=>{
        let target = ev.target.getAttribute("alt");
        setClickValue(target);

        if(!isOpen && target === "menuToggle")
            setIsOpen(true);
        else if(isOpen)
            setIsOpen(false);

        if(!isAlarm && target === 'alarm')
            setIsAlarm(true);
        else if(isAlarm)
            setIsAlarm(false);
    }

    const handleAlarmDiv = ()=>{
        setIsAlarm(false);
        setClickValue("");
    }

    return (
        <>
            <>
                {
                    rightTopMenu.map((val, idx)=>{
                        return(
                            <li key={idx} className="top-right-image">
                                <HeaderRightTopImage src={val} alt={rightTopAlt[idx]} title={rightTopAlt[idx]} onClick={handleImageClick} className={clickValue === rightTopAlt[idx] && "active"}/>
                            </li>
                        )
                    })
                }
            </>
            <>
                <DropdownMenu isOpen={isOpen}/>
                {
                    (clickValue === "alarm" && isAlarm) && <DropDownAlarm onClickAlarmCloseBtn={handleAlarmDiv}/>
                }
            </>
        </>
    )
}

const DropDownAlarm = ({onClickAlarmCloseBtn})=>{
    const data = [
        {data:"OOO님이 게시글을 등록하였습니다.", date:getDate()},
        {data:"XXO님이 게시글을 등록하였습니다.", date:getDate()},
        {data:"OYY님이 게시글을 등록하였습니다.", date:getDate()},
        {data:"ZZZ님이 게시글을 등록하였습니다.", date:getDate()},
        {data:"ODO님이 게시글을 등록하였습니다.", date:getDate()}
    ]
    return(
        <DropDownAlarmWrapper>
            <CloseAlarmButton onClick={onClickAlarmCloseBtn}>x</CloseAlarmButton>
            <ul>
                {
                    data.map((val, idx)=>{
                        return(
                            <AlarmList data={val} idx={idx} key={idx}/>
                        )
                    })
                }
            </ul>
        </DropDownAlarmWrapper>
    )
}

const AlarmList = ({data, idx})=>{
    return(
        <>
            <li className="alarm-list-idx" idx={idx}>
                <p>{data.data}</p>
                <span>{data.date}</span>
            </li>
        </>
    )
}

const DropdownMenu = ({isOpen})=>{
    const menu = ["My Profile", "Add New Post", "Alarm", "", "Logout"];
    const menuImg = [profile, add, alarm, "", logout]

    return (
        <DropdownMenuOverlay isOpen={isOpen}>
            <DropDownMenuToggle isOpen={isOpen}>
                <ul>
                    {
                        menu.map((val, idx)=>{
                            return(
                                val !== "" ? <li key={idx}><img src={menuImg[idx]} alt={val}/><a href="#">{val}</a></li> : <hr key={idx}/>
                            )
                        })
                    }
                </ul>
            </DropDownMenuToggle>
        </DropdownMenuOverlay>
    )
}

function getDate(date){
    let now = !date ? new Date() : new Date(date);
    if(!now) return;

    let year = now.getFullYear();
    let month = now.getMonth() >= 10 ? now.getMonth() : "0" + now.getMonth();
    let day = now.getDate() >= 10 ? now.getDate() : "0" + now.getDate();
    let hour = now.getHours() >= 10 ? now.getHours() : "0" + now.getHours();
    let minute = now.getMinutes() >= 10 ? now.getMinutes() : "0" + now.getMinutes();

    return year + "-" + month + "-" + day + " " + hour + ":" + minute;
}

export default Header;