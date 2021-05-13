const express = require('express');
const router = express.Router()
const User = require("../models/userModel")
const passport = require('passport');
const authenticate = require('../authenticate')


router.get('/',authenticate.verifyUser,authenticate.isAdmin,(req,res)=>{
    User.find()
    .then((err,users) =>{
        if(!err){
            res.status(200).json(users)
        }
        else{
            res.status(500).json(err)
        }
    })
})
router.post('/signup',(req,res,next) =>{
    User.register(new User({username: req.body.username}),
    req.body.password,(err,user) =>{
        if(err){
            res.status(500).json({err})
        }
        else{
            if(req.body.firstname){
                user.firstname = req.body.firstname;
            }
            if(req.body.lastname){
                user.lastname = req.body.lastname;
            }
            user.admin = false
            user.save((err,user) => {
                if(!err){
                    passport.authenticate('local')(req,res,() =>{
                        res.status(200).json({success: true, Msg: 'Registration Successful'})
                    })
                }
                else{
                    res.status(500).json({success: false, err})
                }
            })
        }
    })
    
})

router.post('/login', passport.authenticate('local'), (req,res)=>{
    var token = authenticate.getToken({_id: req.user._id})
    res.status(200).json({token,success: true, Msg: 'You are Logged in'})
})

module.exports = router