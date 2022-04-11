import {useState} from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button'
import TodoList from "./TodoList";
import TodoControl from './TodoControl';

const TodoInputWrapper = styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
    padding:20px 0px;

    div:first-child{
        width:100%;
        margin-right:10px;
        height:32px;
    }
    div:last-child{
        height:34px;
    }
`;

const Input = styled.input`
    border:1px solid #eaeaea;
    outline:0px;
    height:100%;
    width:100%;

    :focus{
        outline:0px;
    }
`;


const Todo = ()=>{
    const [todoList, setTodoList] = useState([]);

    const handleOnClickSubmit = ()=>{
        let title = document.getElementById("todoText");

        if(title.value != ""){
            setTodoList([...todoList, title.value]);
            title.value = "";
        }else{
            return;
        }
    }

    const handleOnKeyUp = (e)=>{
        if(e.keyCode != 13) return;

        let title = e.target.value;

        if(title != ""){
            setTodoList([...todoList, title]);
            e.target.value = "";
        }else{
            return;
        }
    }

    return (
        <div className="wrapper">
            <TodoInputWrapper>
                <div><Input type="text" id="todoText" placeholder="할일!!" onKeyUp={handleOnKeyUp}/></div>
                <div><Button onClick={handleOnClickSubmit} color="secondary" variant="contained">SUBMIT</Button></div>
            </TodoInputWrapper>
            <ul>
                {
                    todoList.map((val, key)=>{
                        return(
                            <TodoList todo={val} key={key}/>
                        )
                    })
                }
            </ul>
            <TodoControl/>
        </div>
    )
}

export default Todo;