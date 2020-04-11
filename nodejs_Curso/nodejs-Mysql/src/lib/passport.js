const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const pool=require('../database');
const helpers=require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField:'username',
    passwordField:'password',
    passReqToCallback:true
},async (req,username,password,done)=>{
    

    const rows = await pool.query('select * from users where username = ?',[username]);
    if(rows.length>0){
        const user=rows[0];
        console.log(user);
        const validPassword = await helpers.matchPassword(password,user.PASSWORD);
        if(validPassword){
            done(null,user,req.flash('success','welcome ' + user.username));
        }else{
            done(null,false,req.flash('message','incorrect password'));
        }

    }else{
        return done(null,false,req.flash('message','the username does not exist'));
    }


}));

passport.use('local.signup',new LocalStrategy({
    usernameField:'username',
    passwordField:'password',
    passReqToCallback:true
},async (req,username,password,done)=>{

    const{fullname}=req.body;
    const newUser={
        username,
        password,
        fullname

    };
    newUser.password= await helpers.encryptPasswor(password);

    const result=await pool.query('insert into users set?',[newUser]);
    newUser.id=result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser(async(id,done)=>{
    const rows=await pool.query('select*from users where id= ?',[id]);

    done(null,rows[0]);

})


