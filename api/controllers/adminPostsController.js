import categoryModel from "../models/categoryModel.js";
import userModel from "../models/userModel.js";
import postModel from "../models/postModel.js";
import commentModel from "../models/commentModel.js";
import fs from "fs";
import path from "path";


import dotenv from "dotenv";



const __dirname = path.resolve();

  
dotenv.config();

  export const deletePostsController = async (req, res) => {
    try {
      const { selectedIds } = req.body;
  
      if (!Array.isArray(selectedIds) || selectedIds.length === 0) {
        return res.status(400).json({ message: "Invalid selectedIds." });
      }
  
      const posts = await postModel.find({ _id: { $in: selectedIds } });
  
  
      if (posts.length === 0) {
        return res.status(404).json({ message: "Posts not found." });
      }
  
      const photosToDelete = [];
      const videosToDelete = [];
  
      posts.forEach(post => {

        if (post.photo && Array.isArray(post.photo) && post.photo.length > 0) {
          const photoPath = post.photo[0];
          const photoFileName = path.basename(photoPath);
          photosToDelete.push(photoFileName);
       //   console.log("Photo to delete:", photoFileName);
        }
        if (post.video && Array.isArray(post.video) && post.video.length > 0) {
          const videoPath = post.video[0];
          const videoFileName = path.basename(videoPath);
          videosToDelete.push(videoFileName);
         // console.log("Video to delete:", videoFileName);
        }
      });
  
      //console.log("Photos to delete:", photosToDelete);
     // console.log("Videos to delete:", videosToDelete);
  
      const photoDeletePromises = photosToDelete.map(photoFileName => {
        const filePath = path.join(__dirname, 'public/photo', photoFileName);
    //    console.log(`Checking photo file: ${filePath}`);
        return new  Promise((resolve, reject)    => {
          fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
              console.error(`Photo not found: ${filePath}`);
              return resolve();
            }
         //   console.log(`Photo exists: ${filePath}`);
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error(`Failed to delete photo: ${filePath}`, err);
                return reject(err);
              }
            //  console.log(`Photo deleted: ${filePath}`);
              resolve();
            });
          });
        });
      });
  
      const videoDeletePromises = videosToDelete.map(videoFileName => {
        const filePath = path.join(__dirname, 'public/videos', videoFileName);
       // console.log(`Checking video file: ${filePath}`);
        return new Promise((resolve, reject) => {
          fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
              console.error(`Video not found: ${filePath}`);
              return resolve();
            }
            console.log(`Video exists: ${filePath}`);
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error(`Failed to delete video: ${filePath}`, err);
                return reject(err);
              }
              console.log(`Video deleted: ${filePath}`);
              resolve();
            });
          });
        });
      });
  
      await Promise.all([...photoDeletePromises, ...videoDeletePromises]);
  
      const deleteResult = await postModel.deleteMany({ _id: { $in: selectedIds } });
  
      if (deleteResult.deletedCount > 0) {
        return res.status(200).send({
          success: true,
          message: "Posturi șterse cu succes.",
        });
      }
  
      return res.status(404).json({ message: "Posts not found." });
  
    } catch (error) {
      console.error("Error during file deletion:", error);
      return res.status(500).json({ message: "Failed to delete files." });
    }
  };


  export const   createVideoControler = async (req, res) => {
    const { name, postedBy, description, category } = req.body;
    
    let videoPaths = [];
  
    if (Array.isArray(req.files.video) && req.files.video.length > 0) {
      for (let video of req.files.video) {
        videoPaths.push("/" + video.path);
      }
    }
  
    switch (true) {
  
      case !name:
        return res.status(500).send({ error: "name is Required" });
        
      case !postedBy:
          return res.status(500).send({ error: "postedBy is Required" });  
        
      case !description:
          return res.status(500).send({ error: "description is Required" });
  
     case !category:
        return res.status(500).send({ error: "category is Required" });
  
    }
   
    const user = await userModel.findById(postedBy);
  
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
  
    if (user._id.toString() !== postedBy.toString()) {
      return res.status(401).json({ error: "Unauthorized to create post" });
    }
  
    
    try {
      const createdMedia = await postModel.create({
  
        name,
        postedBy,
        description,
        category,
        video: videoPaths,
      });
    
      res.json({ message: "Media created successfully", createdMedia });
  
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };
  

  export const  createPhotoControler = async (req, res) => {
    const { name, postedBy, description, category } = req.body;
    
    let photoPaths = [];
  
    if (Array.isArray(req.files.photo) && req.files.photo.length > 0) {
      for (let photo of req.files.photo) {
        photoPaths.push("/" + photo.path);
      }
    }
  
    switch (true) {
  
      case !name:
        return res.status(500).send({ error: "name is Required" });
        
      case !postedBy:
          return res.status(500).send({ error: "postedBy is Required" });  
        
      case !description:
          return res.status(500).send({ error: "description is Required" });
  
     case !category:
        return res.status(500).send({ error: "category is Required" });
  
    }
   
    const user = await userModel.findById(postedBy);
  
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
  
    if (user._id.toString() !== postedBy.toString()) {
      return res.status(401).json({ error: "Unauthorized to create post" });
    }
  
    
    try {
      const createdMedia = await postModel.create({
  
        name,
        postedBy,
        description,
        category,
        photo: photoPaths,
      });
    
      res.json({ message: "Media created successfully", createdMedia });
  
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };


   export  const updatePhotoController = async (req, res) => {
    try {
      const { pid } = req.params;
      const { name, description } = req.body;
  
  
      // Găsește postul după ID
      const post = await postModel.findById(pid);
  
      if (!post) {
        return res.status(404).send({ error: 'Postarea nu a fost găsită' });
      }
  
     
     
  
      // Actualizează titlul, descrierea și categoria, dacă sunt furnizate
      if (name) post.name = name;
      if (description) post.description = description;
      
  
      // Verifică dacă există noi poze
      if (req.files && req.files.photo && Array.isArray(req.files.photo)) {
  
        // Șterge pozele vechi
        if (post.photo && Array.isArray(post.photo)) {
          post.photo.forEach(photoPath => {
            const fullPath = path.resolve("." + photoPath); // Creează calea completă
          
            if (fs.existsSync(fullPath)) {
              fs.unlinkSync(fullPath); // Șterge fișierul
            
            } else {
              console.log('Fișierul nu există:', fullPath);
            }
          });
        }
  
        // Salvează căile noilor poze
        post.photo = req.files.photo.map(photo => "/" + photo.path);
       
      }
  
      // Salvează modificările
      await post.save();
  
      // Trimite răspunsul cu postul actualizat
      res.status(200).send({ success: true, post });
  
    } catch (error) {
      console.error('Eroare la actualizarea postării:', error);
      res.status(500).send({ error: 'A eșuat actualizarea postării' });
    }
    
   
  };
  
  export  const updateVideoController = async (req, res) => {
    try {
      const { pid } = req.params;
      const { name, description } = req.body;
  
  
      // Găsește postul după ID
      const post = await postModel.findById(pid);
  
      if (!post) {
        return res.status(404).send({ error: 'Postarea nu a fost găsită' });
      }
  
      // Debugging: Verifică postarea găsită
     
  
      // Actualizează titlul, descrierea și categoria, dacă sunt furnizate
      if (name) post.name = name;
      if (description) post.description = description;
      
  
      // Verifică dacă există noi poze
      if (req.files && req.files.video && Array.isArray(req.files.video)) {
  
        // Șterge pozele vechi
        if (post.video && Array.isArray(post.video)) {
          post.video.forEach(videoPath => {
            const fullPath = path.resolve("." + videoPath); // Creează calea completă
          
            if (fs.existsSync(fullPath)) {
              fs.unlinkSync(fullPath); // Șterge fișierul
            
            } else {
              console.log('Fișierul nu există:', fullPath);
            }
          });
        }
  
        // Salvează căile noilor poze
        post.video= req.files.video.map(video => "/" + video.path);
       
      }
  
      // Salvează modificările
      await post.save();
  
      // Trimite răspunsul cu postul actualizat
      res.status(200).send({ success: true, post });
  
    } catch (error) {
      console.error('Eroare la actualizarea postării:', error);
      res.status(500).send({ error: 'A eșuat actualizarea postării' });
    }
    
   
  };
  