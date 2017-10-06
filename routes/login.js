const router = require('express').Router();

const bp = require('body-parser');
const cp = require('cookie-parser');
const passport = require('./localStrategy');
const session = require('express-session');

const db = require('../database')
//passport configuration

router.use(cp('TheSecret'));
router.use(session({
    secret:'TheSecret',
    resave:'false',
    saveUninitialized:true
}))


router.use(bp.urlencoded({extended:true}));
router.use(bp.json());


router.use(passport.initialize());
router.use(passport.session());


router.get('/',function(req,res){
    res.render('login');
})
router.post('/',passport.authenticate('local',{successRedirect:'/artist',failureRedirect:'/login'}))

router.post('/verifyCreds',function(req,res){

    db.then(function(data){
        data.collection('artist_data').find({username:req.body.username}).toArray(function(err,user){
            if(user == 0){
                res.send('username');
            }else if(user[0].password !== req.body.password){
                res.send('password');
            }else{
                res.send('success');
            }
        })
    })


})



module.exports =  router;