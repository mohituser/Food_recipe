const mongoose=require("mongoose");

const connectWithDb=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(console.log("db got connected"))
    .catch((err)=>{
        console.log("db connection issue");
        console.log(err);
        process.exit(1);
    })
}

module.exports=connectWithDb;