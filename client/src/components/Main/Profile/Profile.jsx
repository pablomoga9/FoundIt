import React from "react";
import { useEffect } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState, useContext } from "react";
import { userContext } from '../../../context/userContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  let [addButton, setAddButton] = useState(false);
  const [preferences, setPreferences] = useState(null);
  let showPreferences = false;
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const onSubmit = async (form) => {
    try {
      setPreferences(form,...preferences)
      const res = await axios.update('http://localhost:5000/api/setPreferences/${user}',preferences)
    }
    catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    { user ? console.log(user) : navigate('/login') }
    const getPreferences = async () => {
      try {
        if (preferences !== null) {
          console.log(preferences[0]);
          showPreferences = false;
        }
        else {
          const res = axios.get(`http://localhost:5000/api/getPreferences/${user}`);
          setPreferences(res.data);
          showPreferences = true;
        }
      }
      catch (error) {
        console.log(error)
      }
    }
    getPreferences();
  }, [])
  return (
    <React.Fragment>
      <div className="preferenceAdd"><form onSubmit={handleSubmit(onSubmit)}><input type="text" name="preference" {...register('preference', {
        required: {
          value: true,
          message: "Por favor introduce un Email válido"
        }
      })} /><input type="submit" value="Add" /></form>
      </div>
      <div className="preferencesContainer">{showPreferences ? preferences.forEach(element => {
        <p>{element}</p>
      }) : console.log("nono")}</div>
    </React.Fragment>
  )
}

export default Profile;
