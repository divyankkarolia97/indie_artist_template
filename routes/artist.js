const express = require('express');
const router = express.Router();

const db = require('../database');
const bp = require('body-parser');
const cp = require('cookie-parser');
const passport = require('./localStrategy');
const session = require('express-session');

const dataset = require('../categorydataset.json');


//setting up multer
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './eventImages');
    },
    filename: function (req, file, cb) {
        cb(null, req.user.username + '-' + Date.now() +'.jpg');
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



//path handlers
router.get('/all',(req,res)=>{
    var logged = (req.user)? true: false;

    db.then(function(data){
        data.collection('artist_data').find({}).toArray(function(err,data){
            res.render('allArtist',{logged,data});
        })
    })

})

router.get('/success',function(req,res){
    console.log("Successfully logged in");
    res.redirect('/artist/'+req.user.username);
});

router.post('/addevent',function(req,res,next){
    console.log(req.body);
    console.log(dataset);
    upload(req,res,function(err){
        if(err){
            return ;
        }
        if(req.file == undefined){
            req.file={};
            req.file.filename = (Math.round(Math.random()*3)+1)+'.png';
        }


        db.then(function(data){
            console.log(req.body.id);
            console.log(req.body);
            data.collection('events_data').insertOne({name:req.body.eventname,by:req.user.username,desc:req.body.eventdescription,time:req.body.eventtime,venue:req.body.eventvenue,date:req.body.eventdate,price:req.body.eventprice,category:req.body.category,likes:0,dislikes:0,event_img:req.file.filename})
            data.collection(req.body.category).insertOne({name:req.body.eventname,by:req.user.username,desc:req.body.eventdescription,time:req.body.eventtime,venue:req.body.eventvenue,date:req.body.eventdate,price:req.body.eventprice,category:req.body.category,event_img:req.file.filename})
            res.redirect('/events/'+req.body.eventname);

            next();
        });

    })
});

router.post('/locationData',function(req,res){
    for(object of dataset){
        if(object.category == req.body.category){
            res.send(object);
            break;
        }
    };
})

router.get('/addevent',function(req,res){
    var logged = req.user ? true: false;
    res.render('addevent',{logged});
});
router.get('/notadded',function(req,res){
    res.send("Event was not added");
})

router.get('/:id',function(req,res) {
    var logged = req.user ? true: false;
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    db.then(function (maindata) {
        var username = req.params.id;
        var artistevents;
        maindata.collection('artist_data').findOne({username: username}).then(function (data) {
            var eventscollection=maindata.collection('events_data');
            eventscollection.find({}).toArray().then(function (eventsdata) {
                 artistevents=eventsdata.filter(function(singleevent){
                    if(singleevent.by==username){
                        return true;
                    }
                    return false;
                })
            }).then(function(){
                console.log(artistevents)
                res.render('artistProfile', {logged,data,artistevents});
            })
        })
    });
});

module.exports = router;