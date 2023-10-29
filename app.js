const express=require("express");
const path=require("path");
// const sendMail=require('controller.js')
// const app=require("./app");
const connectWithDb = require("./config/db");
const cookieParser=require("cookie-parser")
const router = require("./routes/useRoute");
const app = express();
require("dotenv").config();
connectWithDb();
const port =5000;
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"views")));
app.use("",router);

// app.listen(process.env.PORT,()=>{
//     console.log("server is running ",process.env.PORT)
// })
module.exports=app;