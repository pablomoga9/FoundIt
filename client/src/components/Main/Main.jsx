import React, { Component } from "react";
import {Route, Routes} from 'react-router-dom';
import Home from './Home/Home';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';

const Main = ()=>{
  return(
    <main className="main">
      <Routes>
        <Route element={<Home/>} path="/"/>
        <Route element={<Login/>} path="/login"/>
        <Route element={<SignUp/>} path="/signup"/>
      </Routes>
    </main>
  )
 }

export default Main;
