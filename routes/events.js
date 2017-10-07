router = require('express').Router();


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




router.get('/all',function(req,res){
    var logged = (req.user)? true: false;

    db.then(function(data){
        data.collection('events_data').find({}).toArray(function(err,data){
            res.render('allEvents',{logged,data});
        })
    })

})


//to filter all the events
router.post('/filter',function(req,res){
    var logged = (req.user)? true: false;
    var filteredEvents = [];
    if(typeof req.body.category == "string"){

        db.then(function(data){
            data.collection(req.body.category[index]).find().toArray(function(err,data){
                for(index in data){
                    filteredEvents.push(data[index]);
                }
            })
        })

    }
    else{
        for(var index in req.body.category){
            console.log(req.body.category[index]);
            db.then(function(data){
                data.collection(req.body.category[index]).find().toArray(function(err,data){
                    for(index in data){
                        filteredEvents.push(data[index]);
                    }
                })
            })
        }
    }
    console.log(filteredEvents);
    res.render('allEvents',{logged,filteredEvents});
})

module.exports = router;