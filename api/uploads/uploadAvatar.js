
import multer from "multer";
import fs from "fs";
import path from "path";


        

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync("public")) {
        fs.mkdirSync("public");
      }
  
      if (!fs.existsSync("public/avatar")) {
        fs.mkdirSync("public/avatar");
      }
  
      cb(null, "public/avatar");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  
   const   uploadAvatar = multer({
    storage: storage,
  
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);
  
    if (ext !== ".png" && ext !== ".jpg") {
      return cb(new Error("Only videos are <!allowed!"));
    }
  
    cb(null, true);
  },
  });
  //module.exports = uploadVideo;
  export default uploadAvatar;

