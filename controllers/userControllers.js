require('dotenv').config();
const userModels = require('../models/userModels');
const saltRounds = 10;
const jwt= require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signup = async(req,res)=>{
    try{    
        const hashPassword = bcrypt.hashSync(req.body.password,saltRounds);
        let newBody = {
            ...req.body,
            image:"https://cdn-icons-png.flaticon.com/512/16/16363.png",
            preferences:[],
            whiteList:[]
        }

        newBody.password = hashPassword;
        const newUser = await userModels.createUser(newBody);
        res.status(200).json(newUser);
   
    }
    catch(error){
        res.status(400).json(error);
    }
}

const login = async(req,res)=>{
    try{
        const userData = await userModels.getUserByEmail(req.body.email);
        if(!userData){
            res.status(400).json({msg:'User not found'})
        }
        else{
            const password = userData[0].password;
            const match = await bcrypt.compare(req.body.password,password);
            if(match){
                const userForToken = {
                    email:userData[0].email,
                    name:userData[0].name,
                    check:true
                }
                const token  = await jwt.sign(userForToken,process.env.SECRET_TOKEN,{
                    expiresIn:3000
                })
              res.cookie('token',token,'trust proxy',{
                    httpOnly:true,
                    secureProxy:true
                }).send()
            }
            else{
                res.status(400).json({msg:'password is not correct'})
            }
        }
    }
    catch(error){
        res.status(400).json({msg:'could not find user'})
    }
}

const getUser = async(req,res)=>{
    try{
        res.status(200).json({msg:req.headers.cookie})
    }
    catch(error){
        res.status(400).json({msg:'there is no user logged'})
    }
}

const logoutUser = async(req,res)=>{
    try{
        return res.clearCookie("token")
    }
    catch(error){
        res.status(400).json({msg:'could not logout user'})
    }
}

const getPreferences = async(req,res)=>{
    try{
        const getPref = await userModels.getPreferences(req.params)
        res.status(200).json(getPref)
    }
    catch(error){
        res.status(400).json({msg:error})
    }
}

const setPreferences = async(req,res)=>{
    try{
        const data = {
            user:req.params,
            preferences:req.body
        }
        const setPref = await userModels.setPreferences(req.params)
        res.status(200).json(setPref);
    }
    catch(error){
        res.status(400).json({msg:'could not update preferences'})
    }
}

module.exports = {
    signup,
    login,
    getUser,
    logoutUser,
    getPreferences,
    setPreferences
}