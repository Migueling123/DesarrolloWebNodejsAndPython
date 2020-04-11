const express=require('express');
const router=express.Router();
const {isLoggedIn}=require('../lib/auth');

const pool=require('../database');//db conexion a la base de datos

router.get('/add',isLoggedIn,(req,res)=>{
    res.render('links/add.hbs');
});
router.post('/add', async (req,res)=>{
    const {title,url,description}=req.body;
    const newLink={
        title,
        url,
        description
    };
    newLink.user_id=req.user.id;
    await pool.query('INSERT INTO links set ?',[newLink]);
    res.redirect('/links');

});
router.get('/datos/:id',async (req,res)=>{
    const borrarLink= await pool.query('select * from links where id=?',[req.params.id]);
    res.json(borrarLink);
});
router.post('/datos/:id',async (req,res)=>{
    console.log(req.body);
    const {cud,id, userid,title,url,description}=req.body;
    const link={        
        id,
        user_id:req.user.id,
        title,
        url,
        description
    }
    if(cud==1){
        await pool.query('delete from links where id=?',id)
        req.flash('success','link removed successfully');
    }else if(cud==2){
        //delete link.user_id;
        await pool.query('update links set ? where id=?',[link,id])
        req.flash('success','link updated successfully');

    }else{
        delete link.id;
        //delete link.user_id;
        await pool.query('INSERT INTO links set ?',[link]);
        req.flash('success','link created successfully');

    }
    res.json({url: '/links'})
});
router.get('/',isLoggedIn,async (req,res)=>{
    const lisLinks= await pool.query('select * from links where user_id=?',[req.user.id]);
    res.render('links/list',{lisLinks})
})
module.exports=router;