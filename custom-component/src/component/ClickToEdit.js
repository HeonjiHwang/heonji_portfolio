import {useState} from 'react';
import styled from 'styled-components';

const ClickToEditWrapper = styled.div`
    width:260px;
    height:auto;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    margin:5px auto;
`;

const ClickToEditLabel = styled.label`
    font-size:14px;
    width:30%;
    margin:0px;padding:0px;
`;

const ClickToEditValueWrapper = styled.div`
    border:1px solid #e4e4e4;
    width:100%;
    height:34px;
    border-radius:5px;
    position:relative;
    overflow:hidden;
`;

const ClickToEditInput = styled.input`
    font-size:14px;
    text-align:center;
    width:100%;
    height:100%;
    border:0px;
    outline:0px;
    z-index:1000;
    position:absolute;
    top:0px;
    left:0px;
    padding:0px;
`;

const ClickToEditSpan = styled.span`
    font-size:14px;
    text-align:center;
    width:100%;
    height:100%;
    display:block;
`;

function ClickToEdit({data}){
    const [dataList, setDataList] = useState(data);

    const handleDataList = (idx, str)=>{
        let arr = dataList;
        arr[idx].str = str;
        setDataList(arr);
    }

    return(
        <>
            {
                dataList.map((val, idx)=>{
                    return(
                        <>
                        <SetClickToEdit key={idx} num={idx} editID={val.editID} title={val.title} handleDataList={handleDataList}>{val.str}</SetClickToEdit>
                        </>
                    )
                })
            }

            <div style={{margin:"30px auto"}}>
            {
                dataList.map((val, idx)=>{
                    return(
                        <div key={idx+dataList.length} style={{display:"inline"}}>
                            <span> {val.title} </span>
                            <SetAllInfo editID={val.editID}>{val.str}</SetAllInfo>
                        </div>
                    )
                })
            }
            </div>
        </>
    )
}

function SetClickToEdit({num, editID, title, children, handleDataList}){
    const [isClick, setIsClick] = useState(false);
    
    const handleEditOnClick = (ev)=>{
        if(!isClick){
            setIsClick(true);
        }
        setTimeout(()=>{
            document.getElementById(editID).value = ev.target.textContent;
            document.getElementById(editID).focus();
        }, 50)
    }

    const handleEditOnFocus = (ev)=>{
        ev.target.parentElement.style.border = "2px solid #3879f1";
        ev.target.select();
    }

    const handleEditOnBlur = (ev)=>{
        if(isClick){
            setIsClick(false);
            ev.target.parentElement.style.border = "1px solid #e4e4e4";

            let str = ev.target.value;
            handleDataList(num, str);
            document.getElementById(editID+"_").textContent = str;
            document.getElementById(editID+"-span").textContent = str;
        }
    }

    return(
        <ClickToEditWrapper>
            <ClickToEditLabel>{title}</ClickToEditLabel>
            <ClickToEditValueWrapper>
                {isClick && <ClickToEditInput id={editID} onBlur={handleEditOnBlur} onFocus={handleEditOnFocus}/>}
                <ClickToEditSpan id={editID+"_"} onClick={handleEditOnClick}>{children}</ClickToEditSpan>
            </ClickToEditValueWrapper>
        </ClickToEditWrapper>
    )
}

function SetAllInfo({editID, children}){
    return(
        <>
            <span id={editID+"-span"}>{children}</span>
        </>
    )
}

export default ClickToEdit;