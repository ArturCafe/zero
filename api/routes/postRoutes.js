import express from "express";
import {
  //  brainTreePaymentController,

  deletePostController,
  getPostsController,
  getSinglePostController,
  postCategoryController,
  postCountController,
  postFiltersController,
  postListController,
  postPhotoController,
  realtedPostController,
  searchPostController,
  updatePostController,
  likePostController,
  commentPostController,
  createVideoControler,
  createPhotoControler,
  updateVideoController 
} from "../controllers/postController.js";
import  uploadVideo from "../uploads/uploadVideo.js";
import uploadPhoto from "../uploads/uploadPhoto.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";





const router = express.Router();
//api/v1/post/create-post
//routes

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
  updatePostController
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
  deletePostController
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



//get photo
router.get("/post-photo/:pid", postPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deletePostController);

//filter product
router.post("/post-filters", postFiltersController);

//product count
router.get("/post-count", postCountController);

//product per page
router.get("/post-list/:page", postListController);

//search product
router.get("/search/:keyword", searchPostController);

//similar product
router.get("/related-post/:pid/:cid", realtedPostController);

//category wise product
router.get("/post-category/:name", postCategoryController);

export default router;
