import './App.css';
import Header from './tiles/Header'
import MainContents from './tiles/MainContents';
import SignIn from "./pages/SignIn";

function App() {
  return (
    <div className="App">
      {/* <Header></Header>
      <MainContents></MainContents> */}
      <SignIn/>
    </div>
  );
}

export default App;