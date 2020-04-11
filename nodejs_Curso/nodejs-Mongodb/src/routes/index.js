const router=require('express').Router();
router.get('/',(req,res)=>{
    res.render('./index/index');
});
router.get('/index/about',(req,res)=>{
    res.render('./index/about');
});
router.get('/index/contact',(req,res)=>{
    res.render('./index/contact');
});
module.exports=router;