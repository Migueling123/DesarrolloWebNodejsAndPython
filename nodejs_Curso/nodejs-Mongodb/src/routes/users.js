const router=require('express').Router();
const User=require('../models/User');
const passport=require('passport');




router.get('/users/signup',(req,res)=>{
    res.render('./users/signup');
});
router.post('/signup',async (req,res)=>{

    const {email,username,password,passwordConf}=req.body;

    const newUser=new User({
        email,
        username,
        password,
    });
    const userEmail=await User.findOne({email});
    if(userEmail){
        req.flash('success','the Email is already in use');
        res.redirect('./users/signup');
    }else{

        newUser.password=await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success','you are registered');
        res.redirect('./users/signin');
    }
    
});


router.get('/users/signin',(req,res)=>{
    res.render('./users/signin');
});
router.post('/signin',passport.authenticate('local',{
    successRedirect: '/notes',
    failureRedirect:'/users/signin',
    failureFlash:true
}) );

router.get('/users/logout',(req,res)=>{
    req.logOut();
    res.redirect('/')
})


module.exports=router;