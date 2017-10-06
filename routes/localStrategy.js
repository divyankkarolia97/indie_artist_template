const passport = require('passport');
const LocalStrategy = require('passport-local');

const db = require('../database');

passport.serializeUser(function(user,done){
    console.log("serializing");
    done(null,user.username);
})

passport.deserializeUser(function(username,done){
    console.log("deserializing");
    db.then(function(data){
        data.collection('artist_data').find({username:username}).toArray(function(err,user){
            done(null,user[0]);
        })
    })
})


passport.use(new LocalStrategy(function(username,password,done){
    //define the local strategy
    console.log(username);
    console.log(password);
    db.then(function(data){
        data.collection('artist_data').find({username:username,password:password}).toArray(function(err,user){
            console.log(user);
            if(user == null){
                done(null,false);
            }else{
                done(null,user[0]);
            }
        })
    })
}))

module.exports  = passport;