import { useState } from "react";
import styled from 'styled-components';
import {Router, Routes, Route} from 'react-router-dom';
import Home from '../pages/Home'

const MainContentWrapper = styled.div`
    width:100%;
    height:calc(100% - 45px);
    overflow:auto;
`;

function MainContents(){
    return(
        <MainContentWrapper>
            {/* <Router>
                <Routes>
                    <Route></Route>
                </Routes>
            </Router> */}
            <Home/>
        </MainContentWrapper>
    )
}

export default MainContents;