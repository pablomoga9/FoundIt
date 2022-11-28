import React from "react";
import {Route, Routes} from 'react-router-dom';
import Home from './Home/Home';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Profile from './Profile/Profile';

const Main = ()=>{
  return(
    <main className="main">
      <Routes>
        <Route element={<Home/>} path="/home"/>
        <Route element={<Login/>} path="/login"/>
        <Route element={<SignUp/>} path="/signup"/>
        <Route element={<Profile/>} path='/profile'/>
      </Routes>
    </main>
  )
 }

export default Main;
