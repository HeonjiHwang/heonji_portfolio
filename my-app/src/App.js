import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainContents from './tiles/MainContents';
import SignIn from "./pages/SignIn";
import Header from './tiles/Header';
import FindUserInfo from './pages/FindUserInfo';
import Joinin from "./pages/Joinin"

function App() {
  const token = window.localStorage.getItem("token");

  if(!token){
    return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<SignIn/>}></Route>
            <Route path="/findID" element={<FindUserInfo path={"findID"}/>}></Route>
            <Route path="/findPwd" element={<FindUserInfo path={"findPwd"}/>}></Route>
            <Route path="/joinin" element={<Joinin/>}></Route>
          </Routes>
        </Router>
      </>
    )
  }
  
  return (
    <div className="App">
      <Header/>
      <MainContents/>
    </div>
  );
}

export default App;