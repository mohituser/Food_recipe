const express=require("express");

const { register, login, setpassword,  home, loginpage, update, forgotpass, resetpass, setNewpassword, errorpage, } = require("../controllers/userController");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const router=express.Router();

router.route("/").get(home);

router.route("/loginpage").get(loginpage);
router.route("/forgotpass").get(forgotpass);
router.route("/register").post(register);
router.route("/login").post(login);

router.route("/resetpass").post(resetpass);
router.route("/setNewpassword/:id").post(setNewpassword);
router.route("/setpassword/:token").get(setpassword);
router.route("/*").get(errorpage)
// router.route("/fetch").get(fetchUser);
// router.route("/update").get(update);
// router.route("/password/reset/:token").post(resetPassword);
// router.route("/password/reset/:token").get(resetpass);
// router.route("/updateUserDetails").post(isLoggedIn,updateUserDetails);

module.exports=router;