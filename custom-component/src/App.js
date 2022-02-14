import './App.css';
import {useState} from 'react';
import styled from 'styled-components';
import Modal from './component/Modal';
import Tab from './component/Tab';
import Tag from './component/Tag';
import AutoComplete from './component/AutoComplete';
import ClickToEdit from './component/ClickToEdit';
import Toggle from './component/Toggle';

function App() {
  let editInfo = [{title:"이름", str:"김코딩", editID:"editName"}, {title:"나이", str:20, editID:"editAge"}];

  return (
    <div className="App">
      <Area title={"Toggle"}><Toggle></Toggle></Area>
      <Area title={"Modal"}><ModalButton>Open Modal</ModalButton></Area>
      <Area title={"Tab"}><Tab TabNum={["ONE", "TWO", "THREE"]}></Tab></Area>
      <Area title={"Tag"}><Tag></Tag></Area>
      <Area title={"AutoComplete"}><AutoComplete></AutoComplete></Area>
      <Area title={"ClickToEdit"}><ClickToEdit data={editInfo}></ClickToEdit></Area>
    </div>
  );
}

function Area({title, children}){
  return (
    <>
      <div className="area">
        <h3>{title}</h3>
        <div>{children}</div>
      </div>
    </>
  )
}

const Button = styled.button`
  background-color:#4b18c3;
  border-radius:50px;
  padding:20px 25px;
  color:#fff;
  cursor:pointer;
  outline:0px;
  border:0px;
`;

function ModalButton({children}){
  const [isOpen, setIsOpen] = useState(false);

  const openModal = ()=>{
    setIsOpen(!isOpen);
  }

  const closeModal = ()=>{
    setIsOpen(!isOpen);
  }

  return(
    <>
      <Button isOpen={isOpen} onClick={openModal}>{children}</Button>
      {isOpen && <Modal closeModal={closeModal}>{'HELLO CODESTATES!'}</Modal>}
    </>
  )
}

export default App;