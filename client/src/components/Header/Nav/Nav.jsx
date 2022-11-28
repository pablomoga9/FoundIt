import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { useContext } from "react";
import { userContext } from "../../../context/userContext";
import { useEffect,useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Nav = ()=>{
  const {user,setUser} = useContext(userContext);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setClicked(!clicked)
  }

  // useEffect(()=>{
  //   const checkUser = async()=>{
  //     try{
  //       if(user===""){

  //       }
  //     }
  //     catch(error){
  //       console.log(error);
  //     }
  //   }
  //   checkUser();
  // })

  const handleLogout= async()=>{
    try{
      const res = await axios.get('http://localhost:5000/api/logout',{withCredentials:true})
      console.log('done')
      setUser("")
      navigate('/login')
    }
    catch(error){
      console.log(error);
    }
    
  }

  return(
    <>
      {user===""?null:
      <div>
         <Link onClick={handleClick} to={'/profile'}>Profile</Link>
         <Link onClick={handleClick} to={'/home'}>Swiper</Link>
         <Link onClick={handleClick} to={'/founding'}>FoundingSection</Link>
         <Link onClick={handleLogout}>Logout</Link>
      </div>
     }
    </>
  )
}

export default Nav;
