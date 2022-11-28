import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import { BrowserRouter } from 'react-router-dom';
import {userContext} from './context/userContext';
import { useState } from 'react';

function App() {
  const [user,setUser] = useState("");
  return (
    <div className="App">
      <BrowserRouter>
      <userContext.Provider value={{user,setUser}}>
      <Header/>
      <Main/>
      <Footer/>
      </userContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
