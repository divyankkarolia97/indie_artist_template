const router = require('express').Router();
const CONFIG = require('../config.js')
const db =  require('../database')
const nodemailer = require('nodemailer')
const bp = require('body-parser');



router.use(bp.urlencoded({extended:true}));
router.use(bp.json());


router.get('/',function(req,res){
    res.render('forgotPassword');
})

// router.post('/verifyEmail',function(req,res){
//     db.then(function(data){
//         data.collection('artist_data').find({email:req.body.email}).toArray(function(err,data){
//             if(data == 0){
//                 res.send('false');
//             }else{
//                 let transporter = nodemailer.createTransport({
//                     service:"Gmail",
//                     auth:{
//                         user:CONFIG.EMAIL_CRED.USERNAME,
//                         pass:CONFIG.EMAIL_CRED.PASSWORD
//                     }
//                 })
//                 let mailOptions = {
//                     from: CONFIG.EMAIL_CRED.USERNAME, // sender address
//                     to: `${data[0].email}`, // list of receivers
//                     subject: 'RECOVERY MAIL indieartistapp.herokuapp.com', // Subject line
//                     text: `Here are  your credentials : \n\n\n\n\t USERNAME: ${data[0].username} \n\t PASSWORD: ${data[0].password} `, // plain text body
//
//                 };
//                 transporter.sendMail(mailOptions, (error, info) => {
//                     if (error) {
//                         return console.log(error);
//                     }
//                     console.log('Message %s sent: %s', info.messageId, info.response);
//
//                 });
//                 res.render('emailSent');
//             }
//         })
//     })
//
//
// })

module.exports = router;
