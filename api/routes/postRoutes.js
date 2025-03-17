import express from "express";
import {
  //  brainTreePaymentController,


  getPostsController,
  getSinglePostController,
  getSearchPostsController,
  postCategoryController,
  getCategoryPostsController,
  postFiltersController,
  postListController,
  postPhotoController,
  realtedPostController,
  likePostController,
  commentPostController,
} from "../controllers/postController.js";
import {
  deletePostsController,
  createVideoControler,
  createPhotoControler,
  updatePhotoController,
  updateVideoController 
}  from "../controllers/adminPostsController.js"
import  uploadVideo from "../uploads/uploadVideo.js";
import uploadPhoto from "../uploads/uploadPhoto.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";



const router = express.Router();
//api/v1/post/create-post
//routes


//Admin
router.delete("/dellete-posts", deletePostsController)

// createvideoPost ;
router.post(
  "/create-videopost",  uploadVideo.fields([
    {
      name: "video",
      maxCount: 5,
    },
  ]),
  createVideoControler
);

//createphotopost
router.post(
  "/create-photopost",  uploadPhoto.fields([
    {
      name: "photo",
      maxCount: 5,
    },
  ]),
  createPhotoControler
);

//updatePostController
router.put(
  "/update-photo/:pid",
  requireSignIn,
  isAdmin,
  uploadPhoto.fields([
    {
      name: "photo",
      maxCount: 5,
    },
  ]),
  updatePhotoController
);

//updatePostController
router.put(
  "/update-video/:pid",
  requireSignIn,
  isAdmin,
  uploadVideo.fields([
    {
      name: "video",
      maxCount: 5,
    },]),

    updateVideoController 
);
//deletePostController
router.delete(
  "/delete-post/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  deletePostsController
);
//"/api/v1/posts/create-comment",
router.put(
  "/create-comment",
 // requireSignIn,
 // isAdmin,
 formidable(),
  commentPostController
);

//api/v1/posts/like-post/id
router.put(
  "/like-post/:pid",
  
  likePostController
);

//8080/api/v1/posts/get-photoposts
//getPostsController
router.get("/get-posts", getPostsController);

//single product
router.get("/get-post/:pid", getSinglePostController);

router.get("/getcategory-posts", getCategoryPostsController);

//
router.get("/getsearch-posts", getSearchPostsController);


//get photo
router.get("/post-photo/:pid", postPhotoController);


//filter product
router.post("/post-filters", postFiltersController);


//product per page
router.get("/post-list/:page", postListController);


//similar product
router.get("/related-post/:pid/:cid", realtedPostController);

//category wise product
router.get("/post-category/:name", postCategoryController);

export default router;
