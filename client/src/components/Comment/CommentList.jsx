import React from "react";



const CommentList = ({comments}) => {

  console.log(comments);
  
if (!comments) {
  return(
    <h2>nus comment</h2>
  )
}
  return (
    <>
     <div  className="w-75" >

     <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {comments?.map((c) => (
                    <>
                      <tr key={c._id} > 
                        <td >{c.userComment}</td>
                        <td > {c.text} </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>   
                  
     </div>
           
    </>
  );
};

export default CommentList;
