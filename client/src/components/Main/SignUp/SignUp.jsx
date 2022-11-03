import React, { Component } from "react";
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";

const SignUp = ()=>{
  const { register, watch, formState: { errors }, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (form) => {
    try {
  
      const res = await axios.post('http://localhost:5000/api/signup', form);
      alert("Usuario creado con exito!");

      navigate('/login')
    }
    catch (error) {
      console.log(error);
    }
  }


  return(
    <>
  <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
    <label htmlFor="name">Nombre</label>
    <input type="text" name="name" {
      ...register('name',{
        required:{
          value:true,
          message:"Por favor introduce un Nombre válido"
        },
        pattern:{
          value:/^[A-Za-z]+$/i,
          message:"El formato no es correcto"
        },
        minLength:{
          value:3,
          message:"Como mínimo debe tener 3 caracteres"
        }
      })
    }/>
    {errors.name && <p>{errors.name.message}</p>}
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
            <input type="submit" value="Regístrate" />
  </form>
  <div>
        <label htmlFor="">Ya tengo cuenta</label>
        <Link to={'/login'}>Inicio de sesión</Link>
      </div>
    </>
  )
}

// https://cdn-icons-png.flaticon.com/512/16/16363.png

export default SignUp;
