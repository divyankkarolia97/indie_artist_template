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

router.post('/like',function(req,res){
    db.then(function(data){
        var eventscollection=data.collection('events_data');

        eventscollection.update({"name":req.body.eventname},{$inc:{likes:1}},function(err,res){
            if(err){
                console.log(err)
            }
        })
        res.redirect('/events/'+req.body.eventname);

    });

});

router.post('/dislike',function(req,res){
    db.then(function(data){
        var eventscollection=data.collection('events_data');

        eventscollection.update({"name":req.body.eventname},{$inc:{dislikes:1}},function(err,res){
            if(err){
                console.log(err)
            }
        })
        res.redirect('/events/'+req.body.eventname);

    });

});

router.get('/:id',function(req,res) {
    var logged = (req.user)? true: false;
    var eventname = req.params.id;
    db.then(function (data) {

        data.collection('events_data').find({name: eventname}).toArray(function (err,data){
            var eventData = data[0];
            res.render('eventpage',{logged,eventData});
        })

    })
});


//to filter all the events
router.post('/filter',function(req,res){
    var logged = (req.user)? true: false;
    var filteredEvents = [];
    if(typeof req.body.category == "string"){

        db.then(function(data){
            data.collection(req.body.category).find().toArray(function(err,data){
                for(index in data){
                    console.log(data[index]);
                    filteredEvents.push(data[index]);
                }

                var data = filteredEvents;
                res.render('allEvents',{logged,data});
            })
        })


    }
    else{

        db.then(function(mdata){
                for(var index in req.body.category){
                    mdata.collection(req.body.category[index]).find().toArray(function(err,sdata){

                        if(sdata){
                            console.log(sdata);
                            for(i in sdata){
                                filteredEvents.push(sdata[i]);
                            }
                        }



                    })
                    var data = filteredEvents;
                    res.render('allEvents',{logged,data});
                }

        })
    }



})

module.exports = router;