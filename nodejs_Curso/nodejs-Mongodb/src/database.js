const mongoose=require('mongoose');
const connection=require('./keys');
mongoose.connect(connection.instance,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log('db is connected');
    //console.log(connection.instance)
}).catch((err)=>{
    console.log(err);
})

