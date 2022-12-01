import React from "react";
import { useEffect } from "react";
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { useState,useContext } from "react";
import {userContext} from '../../../context/userContext';
import {useNavigate} from 'react-router-dom';

const Profile = () =>{
  const { register,formState: { errors }, handleSubmit } = useForm();
  const changePreferences = false;
  const [preferences,setPreferences] = useState(null);
  const {user,setUser} = useContext(userContext);
  const navigate = useNavigate();


  function handleClick(){
    changePreferences = true;
  }


  useEffect(()=>{
    {user?console.log(user):navigate('/login')}
    const getPreferences = async()=>{
      try{
        if(preferences!==null){
          console.log(preferences[0]);
        }
        else{
          const res = axios.get(`http://localhost:5000/api/getPreferences/${user}`);
          setPreferences(res.data);
        }
      }
      catch(error){
        console.log(error)
      }
    }
    getPreferences();
  },[])
  return(
    <React.Fragment>
      <button onClick={handleClick}></button>
      {changePreferences ? <div className="preferencesContainer"><form></form></div>:<div className="preferencesContainer">{preferences.forEach(element => {
        <p>{element}</p>
      })}</div>}
    </React.Fragment>
  )
}

export default Profile;
