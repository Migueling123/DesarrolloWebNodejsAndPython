const router=require('express').Router();
const Note=require('../models/Note');
const {isAuthenticated}=require('../helpers/auth');


router.get('/errors',(req,res)=>{    
    //usar solo con regargas puntuales de una vista  en modal de bootrstrap 
    res.render('./messageErrors',{layout:false})
})
router.get('/notes',isAuthenticated, async (req,res)=>{    
    const notes=await Note.find();    
    res.render('./notes/list',{notes});
});
router.get('/notes/data/:id',async(req,res)=>{
    const nota=await Note.findById(req.params.id);
    res.json(nota);
});
router.post('/notes/data/:id',async (req,res)=>{
    var {operation,title,description}=req.body;
    
    const Errors=[];
    if(!title){
        Errors.push("title is needed ");        
    }
    if(!description){
        Errors.push("description is needed ");    
    }
    if(Errors.length>0){
        req.flash('message',Errors);
        res.json({error:true});
    }else{

        const newNote=new Note({
            id:req.params.id,
            title,
            description            
        })
        
        if(operation==1){
            await newNote.save(); 
            req.flash('success','created succesfully¡');
        }else if(operation==2){
            await Note.findByIdAndUpdate(req.params.id,{title,description});
            req.flash('success','updated succesfully¡');
        }else{
            await Note.findByIdAndDelete(req.params.id);
            req.flash('success','removed succesfully¡');    
        }    
        res.json({error:false});
    }

    
    
});


module.exports=router;