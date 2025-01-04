import userModel from "../models/userModel.js";
import fs from "fs";
import path from "path";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";


export const profilePhotoController = async (req, res) => {

  try {
    const user = await userModel.findById(req.params.pid).select("avatar");
    if (user.avatar.data) {
      res.set("Content-type", user.avatar.contentType);
      return res.status(200).send(user.avatar.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};


export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }   
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
  
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id },/* process.env.JWT_SECRET*/'111', {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
  
//update prfole
export const updateProfileControllerr = async (req, res) => {
  
    try {
    //  const { name, email, address, phone } = req.fields;
      const { avatar } = req.files;
      let avatarPaths = [];

      if (Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
        for (let photo of req.files.photo) {
          avatarPaths.push("/" + avatar.path);
        }
      }
      //alidation
      switch (true) {
   //     case !name:
      //    return res.status(500).send({ error: "Name is Required" });
  //     case !email:
    //        return res.status(500).send({ error: "description is Required" }); 
   //     case !address:
    //      return res.status(500).send({ error: "address is Required" });

   //    case !phone:
      //    return res.status(500).send({ error: "phone is Required" }); 
        
          case avatar && avatar.size > 10000000:
          return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });
      }
  
      const user = await userModel.findByIdAndUpdate(
       req.params.pid,

       { avatar: avatarPaths},
     //   { new: true },
      );
  
    
      res.status(201).send({
        success: true,
        message: " Updated Successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Updte product",
      });
    }
  };
  
  
export  const updateProfileController = async (req, res) => {
    try {
      const {pid } = req.params;
     const { name,  } = req.body;
 
  
      // Găsește postul după ID
      const user = await userModel.findById(pid);
  
      if (!user) {
        return res.status(404).send({ error: 'user nu a fost găsit' });
      }


  if (name == user.name | name == "name") {


      
    
    if (req.files && req.files.avatar && Array.isArray(req.files.avatar)) {
  
      // Șterge pozele vechi
       if (user.avatar && Array.isArray(user.avatar)) {
         user.avatar.forEach(avatarPath => {
           const fullPath = path.resolve("." + avatarPath); // Creează calea completă
           console.log('Verific dacă fișierul există pentru ștergere:', fullPath);
 
           if (fs.existsSync(fullPath)) {
             fs.unlinkSync(fullPath); // Șterge fișierul
             console.log('Fișier șters:', fullPath);
           } else {
             console.log('Fișierul nu există:', fullPath);
           }
         });
       }
 
       // Salvează căile noilor poze
       user.avatar = req.files.avatar.map(avatar => "/" + avatar.path);
       console.log('Noile poze salvate:', user.avatar);
     }
   
     // Salvează modificările
     await user.save();
      

      // Trimite răspunsul cu postul actualizat
      res.status(200).send({ success: true, user });

    } else{
      if (name) user.name = name;
      if (req.files && req.files.avatar && Array.isArray(req.files.avatar)) {
  
        // Șterge pozele vechi
         if (user.avatar && Array.isArray(user.avatar)) {
           user.avatar.forEach(avatarPath => {
             const fullPath = path.resolve("." + avatarPath); // Creează calea completă
             console.log('Verific dacă fișierul există pentru ștergere:', fullPath);
   
             if (fs.existsSync(fullPath)) {
               fs.unlinkSync(fullPath); // Șterge fișierul
               console.log('Fișier șters:', fullPath);
             } else {
               console.log('Fișierul nu există:', fullPath);
             }
           });
         }
   
         // Salvează căile noilor poze
         user.avatar = req.files.avatar.map(avatar => "/" + avatar.path);
         console.log('Noile poze salvate:', user.avatar);
       }
     
       // Salvează modificările
       await user.save();
        
  
        // Trimite răspunsul cu postul actualizat
        res.status(200).send({ success: true, user });
      
    
    }


    } catch (error) {
      console.error('Eroare la actualizarea postării:', error);
      res.status(500).send({ error: 'A eșuat actualizarea postării' });
    }
    
   
  };

 export const getUsersController = async (req, res) => {

    try {
      const users = await userModel
        .find({})
       
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        //  counTotal: products.length,
        message: "ALlusers ",
        users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr in getting products",
        error: error.message,
      });
    }
  };

  export const deleteUserController = async (req, res) => {
    const  userId  = req.params.id;
    try {
      await userModel.findByIdAndDelete(userId);

      res.status(200).send({
        success: true,
        message: " Deleted successfully",
     
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while deleting ",
        error,
      });
    }
      
  };
  