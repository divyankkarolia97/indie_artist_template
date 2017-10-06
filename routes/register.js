const router = require('express').Router();
const db = require('../database')

const bp = require('body-parser');
const cp = require('cookie-parser');
const passport = require('./localStrategy');
const session = require('express-session');




//setting up multer
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './userImages')
    },
    filename: function (req, file, cb) {
        cb(null, req.body.username+'.jpg');
    }
})

var upload = multer({ storage: storage }).single('avatar');



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
    res.render('register');
});

router.post('/',function(req,res,next){
    upload(req,res,function(err){
        if(err){
            return ;
        }
        if(req.file == undefined){
            req.file={};
            req.file.filename = (Math.round(Math.random()*3)+1)+'.png';
        }


        db.then(function(data){
            console.log(req.file);
            console.log(req.body);

            data.collection('artist_data').insertOne({username:req.body.username,email:req.body.email,name:req.body.name,password:req.body.password,profile_image:req.file.filename})
            next();
        })


    })


},passport.authenticate('local',{successRedirect:'/artist/success',failureRedirect:'/login'}))


router.post('/usernameAvailable',function(req,res){
    console.log(req.body);
    db.then(function(data){
        data.collection('artist_data').find({username:req.body.username}).toArray(function(err,data){
            if(data == 0){
                res.send('true');
            }else{
                res.send('false')
            }
        })
    })

})


module.exports = router;