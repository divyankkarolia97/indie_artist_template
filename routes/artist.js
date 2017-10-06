const express = require('express');
const router = express.Router();
const bp = require("body-parser");

const db = require('../database');

router.use(bp.json());
router.use(bp.urlencoded({extended:true}));

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