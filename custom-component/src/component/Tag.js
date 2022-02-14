import {useState} from 'react';
import styled from 'styled-components';

const TagWrapper = styled.div`
    width:500px;
    height:40px;
    display:flex;
    margin: 0 auto;
    border-radius:5px;
    border:1px solid #e4e4e4;
    overflow:hidden;
    padding:0 5px;
    align-items:center;
`;

const TagInput = styled.input`
    width:100%;
    height:100%;
    border:0px;
    outline:0px;
    font-size:14px;
    padding:0px;margin:0px;
`;

const TagElem = styled.div`
    padding:5px 30px 5px 5px;
    color:#fff; 
    background-color:#4b18c3;
    font-size:14px;
    border-radius:5px;
    position:relative;
    margin-right:5px;
`;

const TagCloseBtn = styled.div`
    border-radius:50px;
    outline:0px;
    border:0px;
    width:14px;height:14px;
    background-color:#fff;
    color:#000;
    line-height:1;
    text-align:center;
    cursor:pointer;
    font-weight:bold;
    font-size:11px;
    position:absolute;
    right:5px;
    top:50%;
    transform:translateY(-50%);
`;

function Tag(){
    const [tags, setTags] = useState([]);

    const addTag = (ev) =>{
        if(ev.keyCode === 13){
            let text = ev.target.value;
            if(text !== ''){
                setTags(tags.concat(text));
            }
            ev.target.value = "";
        }
    }

    const removeTag = (ev, val)=>{
        tags.splice(tags.indexOf(val), 1);
        ev.target.parentElement.remove();
    }

    const handleOnFocus = (ev)=>{
        ev.target.parentElement.style.border = "1px solid #4b18c3";
    }
    const handleOnBlur = (ev)=>{
        ev.target.parentElement.style.border = "1px solid #e4e4e4";
    }
    return(
        <TagWrapper>
            {
                tags.map((val, idx)=>{
                    return(
                        <TagContent tags={val} key={idx+1} removeTag={(ev)=>removeTag(ev, val)}></TagContent>
                    )
                })
            }
            <TagInput placeholder="Press enter to add tags" onKeyUp={addTag} onFocus={handleOnFocus} onBlur={handleOnBlur}></TagInput>
        </TagWrapper>
    )
}

function TagContent({tags, removeTag}){
    return (
        <>
            {tags.length > 0 && <TagElem>{tags} <TagCloseBtn onClick={removeTag}>x</TagCloseBtn></TagElem>}
        </>
    )
}

export default Tag;