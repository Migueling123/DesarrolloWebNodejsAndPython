const bcrypt=require('bcryptjs');
const helpers={};


helpers.encryptPasswor= async (password)=>{

    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(password,salt);
    return hash;
};
helpers.matchPassword=async (password,savePassword)=>{
    try{
        console.log('estoy aqui')
        const validate= await bcrypt.compare(password,savePassword);
        console.log(validate);
        return validate;
    } catch(e){
        console.log(e);
    }
};

module.exports=helpers;