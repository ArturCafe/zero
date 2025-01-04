import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getUsersController,
  deleteUserController
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import uploadAvatar from "../uploads/uploadAvatar.js";
//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);


//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//get user
router.get("/get-users", requireSignIn, isAdmin,  getUsersController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile  
router.put("/update-profile/:pid",
  requireSignIn,
 //isAdmin,
 uploadAvatar.fields([
  {
    name: "avatar",
   
  },]),  
 
   updateProfileController);

//deleteUserController
router.delete("/delete-user/:id", requireSignIn, isAdmin,  deleteUserController);

export default router;
