import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainContents from './tiles/MainContents';
import SignIn from "./pages/SignIn";
import Header from './tiles/Header';
import FindUserInfo from './pages/FindUserInfo';

function App() {
  const token = window.localStorage.getItem("token");

  if(!token){
    return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<SignIn/>}></Route>
            <Route path="/find" element={<FindUserInfo/>}></Route>
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