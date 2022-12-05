const pool = require('../utils/elephantSQL');
require('dotenv').config();
const queries = require('./queries');


const createUser = async(body)=>{
    try{    
        console.log(body)
        const data = await pool.query(queries.createUser,[body.email,body.password,body.name,body.image,body.preferences,body.whiteList]);
        const results = data.rows;
        console.log(results);
        return results;
    }
    catch(error){
        console.log(error.stack);
    }
}

const getUserByEmail = async(email)=>{  
    try{
        const data = await pool.query(queries.getUserByEmail,[email]);
        const results = data.rows;
        // console.log(results);
        return results;
    }
    catch(error){
        console.log(error.stack)
    }
}

const getPreferences = async(user)=>{
    try{
        const getPrefs = await pool.query(queries.getPreferences,[user]);
        const results = getPrefs.rows;
        return results;
    }
    catch(error){
        console.log(error.stack);
    }
}

const setPreferences = async(data)=>{
    try{
        const setPrefs = await pool.query(queries.setPreferences,[])
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    createUser,
    getUserByEmail,
    getPreferences
}