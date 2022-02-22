import React, {useState, useEffect} from 'react';
import {Axios} from '../utils/common';
import profile from '../imgs/profile.png';
import styled from 'styled-components';


const ContentWrapper = styled.div`
    padding:10px;
    max-width:850px;
    height:auto;
    border-radius;10px;
    border:1px solid #eaeaea;
    margin:0 auto;
    margin-bottom:10px;
    user-select:none;
`;
const ContentHeader = styled.div`
    width:calc(100% - 20px);
    height:35px;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    border-bottom:1px solid #eaeaea;
    padding:0px 10px;

    div{
        display:flex;
        align-items:center;
    }
    div > img{
        width:25px;
        height:25px;
        margin-right:5px;
    }
    div > span{
        font-size:12px;
    }
`;
const ContentPicture = styled.div`
    width:100%;
    padding:10px 0px;
    border-bottom:1px solid #eaeaea;

    img{
        width:100%;
    }
`;
const ContentText = styled.div`
    width:calc(100% - 20px);
    height:auto;
    padding:20px 10px;
    border-bottom:1px solid #eaeaea;
    font-size:14px;
    line-height:1.3;
`;
const ContentFooter = styled.div`
    display:flex;
    align-items:center;
    justify-content:flex-end;
    width: calc(100% - 20px);
    padding: 10px 10px 0px;

    img{
        width:25px;
        height:25px;
        cursor:pointer;
        margin-left:10px;
    }
`;

const Home = ()=>{
    const [onLoad, setOnLoad] = useState(false);
    const [data, setData] = useState([]);

    useEffect(()=>{
        if(!onLoad){
            Axios.get("/getSNSData", {user_cd:1}).then(res=>{
                if(res){
                    setData(res.data.data);
                    setOnLoad(true);
                }
            }).catch(err=>{
                setData([]);
                setOnLoad(true);
            })
        }
    });

    return (
        <div style={{padding:"20px"}}>
            {
                data.map((val, idx)=>{
                    return(
                        <ContentWrapper key={idx} data-id={val.id}>
                            <ContentHeader>
                                <ContentHeaderLeft user_id={val.user_id} user_cd={val.user_cd} date={val.create_time}/>
                            </ContentHeader>
                            <Content picture={val.picture} text={val.text}></Content>
                            <ContentFooter>
                                <IsGoodContent count={val.is_good_count} isGood={val.is_good_count > 0 ? true : false}/>
                                <img src={require("../imgs/comment.png")} alt="comment"/>
                            </ContentFooter>
                        </ContentWrapper>
                    )
                })
            }
        </div>
    )
}

const IsGoodContent = ({isGood}) =>{
    const [isLike, setIsLike] = useState(isGood);

    const handleOnClickLike = ()=>{
        setIsLike(!isLike);
    }

    return(
        <>
            {
                <img src={isLike ? require("../imgs/heart_fill.png") : require("../imgs/heart.png")} alt="good" onClick={handleOnClickLike}/>
            }
        </>
    )
}

const ContentHeaderLeft = ({user_id, date})=>{
    return(
        <>
            <div>
                <img src={profile} alt="profile"/>
                <span>{user_id}</span>
            </div>
            <div>
                <span>{date}</span>
            </div>
        </>
    )
}

const Content = ({picture, text})=>{
    return(
        <>
            {picture && <ContentPicture><img src={require('../imgs/upload_image/'+picture+'.jpg')} alt="content-picture1"/></ContentPicture>}
            <ContentText>
                {
                    text.split("\\n").map((txt, idx)=>{
                        return(
                            <p key={idx}>{txt}</p>
                        )
                    })
                }
            </ContentText>
        </>
    )
}

export default Home;