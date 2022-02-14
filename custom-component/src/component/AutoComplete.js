import {useState} from 'react';
import styled from 'styled-components';

const searchData = ['antique', 'vintage', '중고A급', '가나', '초콜릿', '다이어리', '틴트', '볼펜', '공책', '조명', '모니터링', 'error', 'event', 'setting', 
                    'conceal', 'dynamic', 'static', 'rustic', 'refurbished', 'java', 'javascript', 'react', 'hello', 'world', 'band', 'hi', 'iphone', 'vue'];

const SearchBoxWrapper = styled.div`
    width:100%;
    height:auto;
    overflow:hidden;
    border:1px solid #e4e4e4;
    border-radius:10px;
    display:flex;
    flex-direction:column;
`;
const SearchBox = styled.div`
    width:100%;
    height:40px;
    overflow:hidden;
    display:flex;
    position:relative;
    align-items:center;
    border-bottom:${props=>props.len > 0 ? '1px solid #e4e4e4' : 'none'};
    margin-bottom:${props=>props.len > 0 ? '5px' : '0px'};
`;

const SearchInput = styled.input`
    width:100%;
    height:100%;
    border:0px;
    outline:0px;
    margin-left:10px;
`;

const CancelButton = styled.a`
    position:absolute;
    right:12px;
    font-size:13px;
    cursor:pointer;
    padding:0px 3px;
`;

const AutoResultA = styled.a`
    display:block;
    text-align:left;
    padding:3px 5px;
    cursor:pointer;
    font-size:14px;
    margin-bottom:${props=>props.len-1 === props.idx ? '5px' : '0px'};

    &:hover{
        background-color:#e3e3e3;
    }
`;

function AutoComplete(){
    const [autoArr, setAutoArr] = useState([]);

    const handleOnSearchFocus = (ev)=>{
        ev.target.parentElement.parentElement.style.boxShadow = '0px 5px 2px rgba(0,0,0,0.15)';
    }

    const handleOnSearchBlur = (ev)=>{
        ev.target.parentElement.parentElement.style.boxShadow = 'none';
    }

    const handleOnSearchKeyUp = (ev)=>{
        let val = ev.target.value;
        
        if(val !== ""){
            let arr = searchData.filter(x=>x.startsWith(val)).sort();
            if(arr.length > 0){
                setAutoArr(arr);
            }else{
                setAutoArr([]);
            }
        }else{
            setAutoArr([]);
        }
    }

    const handleSearchInputValue = (str)=>{
        document.getElementById("auto-search-input").value = str;
        setAutoArr([]);
    }

    const handleOnCancelClick = ()=>{
        document.getElementById("auto-search-input").value = '';
        setAutoArr([]);
    }

    return(
        <SearchBoxWrapper>
            <SearchBox len={autoArr.length}>
                <SearchInput id='auto-search-input' autoComplete="off" onFocus={handleOnSearchFocus} onBlur={handleOnSearchBlur} onKeyUp={handleOnSearchKeyUp}></SearchInput>
                <CancelButton onClick={handleOnCancelClick}>x</CancelButton>
            </SearchBox>
            {
                autoArr.length > 0 && autoArr.map((val, idx)=><AutoResultA className='auto-search-list' key={idx} idx={idx} len={autoArr.length} onClick={()=>handleSearchInputValue(val)}>{val}</AutoResultA>)
            }
        </SearchBoxWrapper>
    )
}

export default AutoComplete;