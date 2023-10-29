const path=require("path");
const mailHelper=require("../utils/nodemailer")
const  userSchema =require("../models/schema")
exports.home=(req,res,next)=>{
    res.render("index");
    }
    exports.errorpage=(req,res,next)=>{
        res.sendFile(path.join(__dirname,"../views/error.html"));
        }
exports.loginpage=(req,res,next)=>{
        res.sendFile(path.join(__dirname,"../views/login.html"));
  
        } 
exports.forgotpass=(req,res,next)=>{
    res.sendFile(path.join(__dirname,"../views/forgotpass.html"));
            }
exports.register=async(req,res,next)=>{
                console.log(req.body.name);
                try {
                    const {name , email, password}=req.body; 
                // let result; 
                console.log(email);
                const user=await userSchema.create({
                    name,
                    email,
                    password,
                });
                console.log(user);
                const token = user.getJwtToken();
                const option={
                    expires:new Date(
                        Date.now()+3 * 24 * 60 * 60 * 1000
                    ),
                    httpOnly:true,
                
                }
                // res.cookie("token",token,option).sendFile(path.join(__dirname,"../views/recipe.html"));
                res.sendFile(path.join(__dirname,"../views/recipe.html"))
                    
                } catch (error) {
                    res.send("unsuccessfull")
                    
                }
                
                }            
 exports.login=async(req,res,next)=>{
    try {
        const {email,password}=req.body;
        // console.log(email);
        if(!email || !password){
            return next(new customError("email and password is required"),400);
        }
        const user=await userSchema.findOne({email}).select("+password");
        if(!user){
            return next(new customError("you are not registered"),400);
        }
        const isPasswordCorrect=await user.isValidatedPassword(password);
        if(!isPasswordCorrect){
            return next(new customError("wrong password "),400);
            // res.send("wrong password");
        }
        const token = user.getJwtToken();
        const option={
            expires:new Date(
                Date.now()+3 * 24 * 60 * 60 * 1000
            ),
            httpOnly:true,
        
        }
        // res.cookie("token",token,option).render("updateform",{name:user.name,email:user.email});
        res.cookie("token",token,option).
        sendFile(path.join(__dirname,"../views/recipe.html"))
        // console.log(cookie.token);
        // res.render("updateform");
    
        
    } catch (error) {
        res.send("unsuccessful");
        // res.status(404).
        
    }
                  
                    
      }
exports.resetpass=async(req,res,next)=>{
        const {email}=req.body;
        const user=await userSchema.findOne({email});
        const flag=0;
        if(!user){
         return next(new customError("email not found"))
        }
        const forgotToken=user.getForgotPasswordToken();
        try {
        await user.save({validateBeforeSave:false});
        console.log(user);
        const myUrl=`${req.protocol}://${req.get("host")}/setpassword/${forgotToken}`;
        const message=`copy paste this link in your url and hit the enter/n/n ${myUrl}`;
        
         await mailHelper({
            email: email,
            subject:"Reset Password", 
            Quotes:'',
            message,
         }) 
     
         res.status(200).json({
             success:true,
             message:"email has been sent successfully"
         })
         
        } catch (error) {
         user.forgotPasswordExpiry=undefined,
         user.forgotPasswordToken=undefined,
         await user.save({validateBeforeSave:false});
     return next(new CustomError(error.message,500))
     
        }
     } 
    exports.setpassword=async(req,res,next)=>{
        
            const forgotPasswordToken=req.params.token;
        console.log(forgotPasswordToken);
            const user=await userSchema.findOne(
                {
                    forgotPasswordToken,
                    forgotPasswordExpiry:{$gt:Date.now()}
            });
            try {
            if(!user){
                // return next(new customError("This link is not valid now, try again",400))
                res.send("This link is not valid now, try again")
                // return next(new customError("unsuccessfull",400))
            }
            // console.log(forgotPasswordToken);
        //     user.forgotPasswordToken=undefined;
        //   user.forgotPasswordExpiry=undefined;
        //   await user.save({validateBeforeSave:false});
        //  req.user=user;
         
        // res.send(path.join(__dirname,"../views/resetPass.ejs"));
        console.log("1 .....", user);
        res.render("resetPass",{forgotPasswordToken});
            
        } catch (error) {
            // user.forgotPasswordToken=undefined;
    //  user.forgotPasswordExpiry=undefined;
    //  await user.save({validateBeforeSave:false});
     res.send("some thing went wrong")

            
        }
       
    } 
    
    exports.setNewpassword=async(req,res,next)=>{
        const forgotPasswordToken=req.params.id;
        const user=await userSchema.findOne({forgotPasswordToken});
      console.log("forgot s;xos"  ,forgotPasswordToken);
        console.log("user ,," ,user);
        console.log("my name i id ",user.email);

         if(req.body.password!==req.body.confirmPassword){
            //  return next(new customError("password and confirm is not matched",400));  
            // alert("password and confirm is not matched , try again") 
            res.sendFile(path.join(__dirname,"../views/resetPass.html")); 
         }
         user.password=req.body.password;
         // console.log(token);
         user.forgotPasswordToken=undefined;
         user.forgotPasswordExpiry=undefined;
     
     await user.save();
     
   
   
    res.sendFile(path.join(__dirname,"../views/login.html"));

      }
