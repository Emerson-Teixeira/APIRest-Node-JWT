const passport = require("passport");
var localStrategy = require('passport-local').Strategy;
var User = require('./models/userModel');
var jwtStg = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config = require('./config')

exports.local = passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

exports.getToken = function(user){
    return jwt.sign(user, config.secretKey, {expiresIn: 3600})
}

var opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey

exports.jwtPassport = passport.use(new jwtStg(opts, (jwt_payload,done) => {
    User.findOne({_id: jwt_payload._id}, (err,user)=>{
        if (err){
            return done(err,false)
        }
        else if (user){
            return done(null,user)
        }
        else{
            return done(null,false)
        }
    })
}))

exports.verifyUser = passport.authenticate('jwt',{session:false})

exports.isAdmin = function isAdmin(req,res,next){
    if(req.user.admin){
        next()
    }
    else{
        res.status(403).json({msg:'You are not an admin'})
    }
}