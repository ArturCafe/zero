import React from "react";




const CommentInput = ({handleComment, text, setText}) => {


  return (
    <> 
             
                  <form 
               
                  >
          <h4 className="title">scrie commentul</h4>
          
          <div className="mb-3">

            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="form-control"
              id="commentInputEmail1"
             // placeholder="comenteaza"
              required
              autoFocus
            />

          </div>

          </form>
                  <button class="btn btn-secondary ms-1"
                  onClick={handleComment}
                  > Comment</button>
                
           
      
    </>
  );
};

export default CommentInput;
