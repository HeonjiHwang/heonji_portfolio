import { useState } from 'react';
import styled, {keyframes} from 'styled-components';

const onToggle = keyframes`
    from{
        width:0px;
    }
    to{
        width:100%;
    }
`;

const offTogle = keyframes`
    from{
        width:100%;
    }
    to{
        width:0px;
    }
`;
const ToggleWrapper = styled.div`
    width:70px;
    height:30px;
    border-radius:50px;
    cursor:pointer;
    background:#d5d5d5;
    position:relative;
    display:flex;
    align-items:center;
    overflow:hidden;
    cursor:pointer;
    z-index:0;
    margin: 0 auto;
`;
const Ball = styled.div`
    border-radius:50%;
    width:22px;
    height:22px;
    margin:4px;
    background:#fff;
    transition:0.5s;
    z-index:1;
    position:relative;
`;
const ToggleSlide = styled.div`
    background:#4b18c3;
    width:0px;
    height:100%;
    position:absolute;
    user-select:none;
    top:0px;
    left:0px;
    animation-duration:0.5s;
    animation-timing-function:ease-out;
    animation-name:${props=>props.isCheck ? onToggle : offTogle};
    z-index:1;
`;

function Toggle(){
    const [isCheck, setIsCheck] = useState(false);

    const handleToggle = (ev)=>{
        setIsCheck(!isCheck);
        document.getElementById("ball").style.marginLeft = !isCheck ? "43px" : "4px";
        setTimeout(()=>{
            if(!isCheck)
                document.getElementById("slide").style.width = "100%";
            else
                document.getElementById("slide").style.width = "0px";
        }, 55)
    }

    return(
        <>
            <ToggleWrapper onClick={handleToggle}>
                <ToggleSlide id="slide" isCheck={isCheck}/>
                <Ball id="ball"/>
            </ToggleWrapper>
            <label style={{"margin-top":"10px", "font-size":"14px", "display":"block"}}>
                Toggle Switch {isCheck ? <span>ON</span> : <span>OFF</span>}
            </label>
        </>
    )
}

export default Toggle;