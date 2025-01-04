
import multer from "multer";
import fs from "fs";
import path from "path";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }

    if (!fs.existsSync("public/photo")) {
      fs.mkdirSync("public/photo");
    }

    cb(null, "public/photo");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

 const   uploadPhoto = multer({
  storage: storage,

fileFilter: function (req, file, cb) {
  var ext = path.extname(file.originalname);

  if (ext !== ".png" && ext !== ".jpg") {
    return cb(new Error("Only videos are allowed!"));
  }

  cb(null, true);
},
});
//module.exports = uploadVideo;
export default uploadPhoto;