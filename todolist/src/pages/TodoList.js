import React, {useState} from 'react';
import styled from 'styled-components';
import Checkbox from '@mui/material/Checkbox'

const TodoListLI = styled.li`
    display:flex;
    width:500px;
    align-items:center;
    border-bottom:1px solid #eaeaea;
    background-color:${props => props.backgroundColor};
    color:${props => props.fontColor};

    :last-child{
        border-bottom:0px;
    }
    div > span.todoTitle{
        margin-left:10px;
        user-select:none;
        cursor:default;
    }
`;

const TodoList = ({todo})=>{
    const [checked, setChecked] = useState(false);
    const [backColor, setBackColor] = useState("#fff");
    const [fontColor, setFontColor] = useState("inherit");

    const handleChangeTodoChecked = e =>{
        setChecked(e.target.checked)

        if(e.target.checked){
            setBackColor("#f2f3f4");
            setFontColor("#636363");
        }else{
            setBackColor("#fff");
            setFontColor("inherit");
        }
    }

    return (
        <TodoListLI backgroundColor={backColor} fontColor={fontColor}>
            <div>
                <Checkbox color="secondary" sx={{color:"rgb(194, 115, 229)"}} onChange={handleChangeTodoChecked} checked={checked}/>
            </div>
            <div>
                <span className="todoTitle">{todo}</span>
            </div>
        </TodoListLI>
    )
}

export default TodoList;