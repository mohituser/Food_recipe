const path=require("path");
const app=require("./app");
const connectWithDb = require("./config/db");

connectWithDb();
const port =5000;
// app.use('/css',express.static(path.resolve(__dirname,"assets/css")));

app.listen(port,()=>{
    console.log("server is running ",port)
})