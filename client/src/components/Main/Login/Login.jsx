import React from "react";
import { useContext } from "react";
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import jwt from "jwt-decode";
import {userContext} from '../../../context/userContext';
import { useEffect } from "react";

const Login = ()=>{
  const { register,formState: { errors }, handleSubmit } = useForm();
  const {user,setUser} = useContext(userContext);
  const navigate = useNavigate();

  const onSubmit = async(form)=>{
    try{  
      // const res = await axios.post('http://localhost:5000/api/login',form);
      const res = await axios.post('http://localhost:5000/api/login',form,{
        withCredentials:true
      })
      const getUser = await axios.get('http://localhost:5000/api/getUser',{
        withCredentials:true
      });
      const userToken = getUser.data.msg.substr(6,getUser.data.msg.length);
      const checkUser = await jwt(userToken);
      await setUser(checkUser.name);
      
      navigate('/home');
    }
    catch(error){
      console.log(error.response)
    }
  }

  useEffect (()=>{
    const checkUser = async()=>{
      try{
        if(user===""){
          console.log("ther's no user logged")
        }
        else{
          const getUser = await axios.get('http://localhost:5000/api/getUser',{
            withCredentials:true
          });
          const userToken = getUser.data.msg.substr(6,getUser.data.msg.length);
          const checkUser = await jwt(userToken);
          await setUser(checkUser.name);
          console.log(user)
          navigate('/home');
        }
      }
      catch(error){
        console.log(error);
      }
    }
    checkUser()
  },[])

  return(
    <>
      <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
            <input type="text"
              name="email"
              id="email"
              {...register('email', {
                required: {
                  value: true,
                  message: "Por favor introduce un Email válido"
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Por favor introduce un Email válido"
                }
              })
              } />
            {errors.email && <p>{errors.email.message}</p>}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              {...register("password", {
                required: "Por favor introduce una contraseña",
                minLength: {
                  value: 8,
                  message: "Por favor introduce una contraseña mayor de 8 caracteres",
                },
                validate: (value) => {
                  return (
                    [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
                      pattern.test(value)
                    ) || "La contraseña debe incluir minusculas, mayusculas, numeros y caracteres especiales"
                  );
                },
              })}
            />
            {errors.password ? <div>{errors.password.message}</div> : null}
            <input type="submit" value="Iniciar Sesión" />
      </form>
      <div>
        <label htmlFor="">¿Aún no tienes cuenta?</label>
        <Link to={'/signup'}>Regístrate</Link>
      </div>
    </>
  )
}



export default Login;
