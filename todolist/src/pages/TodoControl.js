import {useState} from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button'

const TodoControlWrapper = styled.div`
    width:calc(100% - 10px);
    padding:10px;
    display:flex;
    z-index:1;
    background-color:#fff;
    justify-content:flex-end;

    div{
        margin-left:10px;
    }
`;

const TodoControl = ()=>{
    return(
        <TodoControlWrapper>
            <div><Button color="error" variant="contained">RESET</Button></div>
            <div><Button color="primary" variant="contained">SAVE</Button></div>
        </TodoControlWrapper>
    )
}

export default TodoControl;