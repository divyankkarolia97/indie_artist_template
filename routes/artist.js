const express = require('express');
const router = express.Router();

const db = require('../database');

//setting up passport
const bp = require('body-parser');
const cp = require('cookie-parser');
const passport = require('../routes/localStrategy');
const session = require('express-session');

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



//path handlers
router.get('/all',(req,res)=>{
    var logged = (req.user)? true: false;

    db.then(function(data){
        data.collection('artist_data').find({}).toArray(function(err,data){
            res.render('allArtist',{logged,data});
        })
    })

})


router.post('/artistdata',(req,res)=>{

    //sends the artist data
    console.log(req.body);
    db.then(function(data){
        data.collection('artist_data').find({username:req.body.username}).limit(1).toArray(function(err,data){
            if(data == 0){
                res.send("false");
            }else{
                res.send(data[0]);
            }
        });

    })
})

router.post('/eventsData',(req,res)=>{
    //sends the events data of a particular artist
    db.then(function(data){
        data.collection('events_data').find({username:req.body.username}).toArray(function(err,data){
            res.send(data);
        })
    })

})


module.exports = router;