import categoryModel from "../models/categoryModel.js";
import userModel from "../models/userModel.js";
import postModel from "../models/postModel.js";
import commentModel from "../models/commentModel.js";
import fs from "fs";
import path from "path";


import dotenv from "dotenv";





  
dotenv.config();


// filters  in lucru
export const postFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const posts = await postModel.find(args);
    res.status(200).send({
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};


  

export const getCategoryPostsController = async (req, res) => {
  const { category, page = 1, limit = 20 } = req.query; // Default to page 1 and limit 20
  const skip = (page - 1) * limit; // Calculate how many posts to skip

  if (!category) {
    return res.status(400).json({
      success: false,
      message: "Category is required",
    });
  }

  try {
    const posts = await postModel
      .find({ category }) // Find posts that belong to the given category
      .populate("category") 
      .populate("postedBy")
      .populate("comments")
      .skip(skip) // Skip posts for pagination
      .limit(Number(limit)); // Ensure limit is a number

    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while fetching posts by category",
      error,
    });
  }
};


export const getSearchPostsController = async(req, res) => {
  try {
    // Destructure query parameters
    const { currentPage, limit , category, name } = req.query;

    // Parse categories
    const categories = Array.isArray(category) ? [...new Set(category)] : (category ? [category] : []);


    // Construct filter
    const filter = {};
    if (categories.length > 0) {
     filter.category = { $in: categories };
 }
     if (name) {
     
        filter.name = new RegExp(name, 'i'); // 'i' makes the search case-insensitive
    }
  
    

    // Fetch total posts count
    const postsCount = await postModel.countDocuments(filter);


    // Fetch paginated posts
    const posts = await postModel.find(filter)
      .skip((currentPage - 1) * limit)
      .limit(Number(limit));

    // Respond with results
    res.status(200).json({
      posts,
      totalPosts: postsCount,
     
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// getPostsController

export const getPostsController = async(req, res) => {
  try {
    // Destructure query parameters
    const { currentPage, limit , category, name } = req.query;

    // Parse categories
    const categories = Array.isArray(category) ? [...new Set(category)] : (category ? [category] : []);


    // Construct filter
    const filter = {};
    if (categories.length > 0) {
      filter.category = { $in: categories };
    }
    if (name) {
      // Use regular expression for case-insensitive search on the 'name' field
      filter.name = new RegExp(name, 'i'); // 'i' makes the search case-insensitive
    }
    

    // Fetch total posts count
    const postsCount = await postModel.countDocuments(filter);
    

    // Fetch paginated posts
    const posts = await postModel.find(filter)
      .skip((currentPage - 1) * limit)
      .limit(Number(limit));

    // Respond with results
    res.status(200).json({
      posts,
      totalPosts: postsCount,
     
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




// get single product
export const getSinglePostController = async (req, res) => {
  try {
    const post = await postModel
      .findById(req.params.pid)
      
      .populate("category")
      .populate( "postedBy")
      .populate( "comments");
   
    res.status(200).send({
      success: true,
      message: "Single Product Fetche",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single produc",
      error,
    });
  }
};

// get
export const postCategoryController = async (req, res) => {
  try {
   
    const category = await categoryModel.findOne({name: req.params.name });

   const posts = await postModel.find({ category}).populate("category");
   
 //  const likes = await likesModel.find({namePost: req.posts.name });
  //const posts = await postModel.find({ category, likes})
  // .populate("category, likes");

    res.status(200).send({
      success: true,
      category,
      posts,
     // likes
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

//  userComment   commentPost
export const  commentPostController= async (req, res) => {
  try {
      const { text } = req.fields;
      const { userComment } = req.fields;
      const { commentPost } = req.fields;
  
      if (!text)
         return res.json({ message: 'Комментарий не может быть пустым' });

     if (!commentPost)

        return res.json({ message: 'post не может быть пустым' });

      if (!userComment )

        return res.json({ message: 'user не может быть пустым' });

     
      const newcomment = await new commentModel(
       req.fields
       ).save();

      try {
          await postModel.findByIdAndUpdate( commentPost, {
              $push: { comments: newcomment._id },
          })
      } catch (error) {
          console.log(error)
          res.status(501).json({ error: err.message });
      }
    res.status(200).json({ message: "Post liked successfully", newcomment });
        
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };
   
    
export const  likePostController = async (req, res) => {
	try {
		//const { postId } = req.params.pid;
		const { userId }= req.body;

		const post = await postModel.findById(req.params.pid);

		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		const userLikedPost = post.likes.includes(req.body.userId);

		if (userLikedPost) {

      const post = await postModel.findById( req.params.pid );
     
      post.likes.splice(userId);
    
      await post.save();
      const data = await postModel.findById(req.params.pid)
			// Unlike post
		//	await postModel.updateOne({ _id: postId }, { $splice: { likes: userId } });
			res.status(200).json({ message: "Post unliked successfully", data});
		} else {
			// Like post
			post.likes.push(userId);
			await post.save();
      const data = await postModel.findById(req.params.pid)
			res.status(200).json({ message: "Post liked successfully" , data});
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// get photo
export const postPhotoController = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.pid).select("photo");
    if (post.photo.data) {
      res.set("Content-type", post.photo.contentType);
      return res.status(200).send(post.photo.data);
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




// product list base on page
export const postListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const posts = await postModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};


// similar products
export const realtedPostController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const posts = await postModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};


// product count
export const getCommentsController = async (req, res) => {
  try {
    const total = await commentModel.findById();

    
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

 export  const updatePostController = async (req, res) => {
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
