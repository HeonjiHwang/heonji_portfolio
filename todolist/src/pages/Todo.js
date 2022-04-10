import {useState} from 'react';
import styled from 'styled-components';
import TodoList from "./TodoList";

const TodoInputWrapper = styled.div`
    display:flex;
    flex-direction:row;
    width:500px;
    margin:0 auto;
    padding:20px 0px;

    div:first-child{
        width:100%;
        margin-right:10px;
        height:32px;
    }
    div:last-child{
        width:150px;
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

const Button = styled.button`
    border:0px;
    outline:0px;
    width:100%;
    height:100%;
`;


const Todo = ()=>{
    const [todoList, setTodoList] = useState([]);

    const handleOnClickSubmit = ()=>{
        let title = document.getElementById("todoText");

        if(title != ""){
            setTodoList([...todoList, title.value]);
            title.value = "";
        }else{
            return;
        }
    }

    return (
        <>
            <TodoInputWrapper>
                <div><Input type="text" id="todoText" placeholder="할일!!"/></div>
                <div><Button onClick={handleOnClickSubmit}>SUBMIT</Button></div>
            </TodoInputWrapper>
            <TodoList/>
        </>
    )
}

export default Todo;