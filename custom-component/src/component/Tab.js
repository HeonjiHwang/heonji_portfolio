import {useState} from 'react';
import styled, {keyframes} from 'styled-components';

const TabWrapper = styled.div`
    width:100%;
    height:50px;
    display:flex;
    background-color:#e3e3e3;
    justify-content:flex-end;
`;

const TabInActive = styled.button`
    cursor:pointer;
    background-color:#e3e3e3;
    color:#898989;
    border:0px;
    outline:0px;
    width:calc(${props=>props.width}% - 20px);
    padding:5px;
    text-align:left;
`;

const fadeIn = keyframes`
    from {
        background-color:#e3e3e3;
    }
    to{
        background-color:#4b18c3;
    }
`;

const TabActive = styled.button`
    cursor:pointer;
    background-color:#4b18c3;
    color:#fff;
    border:0px;
    outline:0px;
    width:calc(${props=>props.width}% - 20px);
    padding:5px;
    text-align:left;

    animation-duration:.3s;
    animation-timing-function:ease-in;
    animation-name:${fadeIn};

`;
const TabContents = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    padding:10px;
    width:100%;
    height:200px;
`;

function Tab({TabNum}){
    const [tabNum, setTabNum] = useState("ONE");

    const handleTab = (val)=>{
        setTabNum(val);
    }
    return(
        <>
            <TabWrapper>
                {
                    TabNum.map((val, idx)=>{
                        return(
                            tabNum === val ? <TabActive key={idx+1} width={parseInt(100/TabNum.length)}>Tab{idx+1}</TabActive> 
                            : <TabInActive onClick={() => handleTab(val)} key={idx+1} width={parseInt(100/TabNum.length)}>Tab{idx+1}</TabInActive>
                        )
                    })
                }
            </TabWrapper>
            <TabContents>Tab menu {tabNum}</TabContents>
        </>
    )
}

export default Tab;