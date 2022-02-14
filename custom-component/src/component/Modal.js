import styled from 'styled-components';

const ModalOverlay = styled.div`
    position:absolute;
    top:0px;
    left:0px;
    width:100%;
    height:100%;
    background-color:#00000059;
    display:flex;
    align-items:center;
    justify-content:center;
`;

const ModalWindow = styled.div`
    min-width:245px;
    min-height:90px;
    padding:5px;
    background-color:#fff;
    position:absolute;
    border-radius:10px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
`;

const CloseBtn = styled.button`
    background: #fff;
    outline: 0px;
    border: 0px;
    cursor: pointer;
    display: block;
    position: absolute;
    top: 5px;
`;

const InnerText = styled.div`
    color:#4b18c3;
    font-weight:bold;
    margin-top:10px;
`;

function Modal({children, closeModal}){
    return(
        <>
            <ModalOverlay>
                <ModalWindow>
                    <CloseBtn onClick={closeModal}>x</CloseBtn>
                    <InnerText>{children}</InnerText>
                </ModalWindow>
            </ModalOverlay>
        </>
    )
}

export default Modal;