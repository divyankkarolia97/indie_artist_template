const express=require('express');
const path = require('path');
const app=express();

//setting up passport
const bp = require('body-parser');
const cp = require('cookie-parser');
const passport = require('./routes/localStrategy');
const session = require('express-session');

const db = require('./database')
//passport configuration

app.use(cp('TheSecret'));
app.use(session({
    secret:'TheSecret',
    resave:'false',
    saveUninitialized:true
}))


app.use(bp.urlencoded({extended:true}));
app.use(bp.json());


app.use(passport.initialize());
app.use(passport.session());



//setting up the view engine
const hbs = require('hbs');
app.set('view engine','hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname+'/views/partials')

//path handlers
app.use('/',express.static(process.env.PWD+'/static'))



//routing
app.get('/',function(req,res){
    var logged = (req.user)? true: false;
    res.render('homepage',{logged});
})


var artist = require('./routes/artist')
app.use('/artist',artist);
var login = require('./routes/login');
app.use('/login',login);
var register = require('./routes/register')
app.use('/register',register);
var forgotPassword = require('./routes/forgotPassword');
app.use('/forgotPassword',forgotPassword);

//about us
app.post('/logout',function(req,res){
    req.logout();
    console.log('logging out')
    res.send('loggedOut');
})

app.get('/aboutus',function(req,res){
    var logged = (req.user)? true: false;
    res.render('aboutus', {logged});
})


app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000,(err)=>{
    if (!err) {
        console.log("Server started on http://localhost:3000");
    }
});
