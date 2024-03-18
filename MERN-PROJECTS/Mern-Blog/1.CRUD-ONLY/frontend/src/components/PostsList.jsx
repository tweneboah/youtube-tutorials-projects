import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { deletePostAPI, fetchAllPosts } from "../APIServices/posts/postsAPI";
import { Link } from "react-router-dom";

const PostsList = () => {
  // ! use query
  const { isError, isLoading, data, error, isSuccess, refetch } = useQuery({
    queryKey: ["lists-posts"],
    queryFn: fetchAllPosts,
  });
  // post mutation
  const postMutation = useMutation({
    mutationKey: ["delete-post"],
    mutationFn: deletePostAPI,
  });
  //delete handler
  const deleteHandler = async (postId) => {
    postMutation
      .mutateAsync(postId)
      .then(() => {
        refetch();
      })
      .catch((e) => console.log(e));
    //refetch
  };
  return (
    <div>
      {isLoading && <p>Loading....</p>}
      {isSuccess && <p>Posts fetched</p>}
      {error && <p>{error.message}</p>}
      {data?.posts.map((post) => {
        return (
          <div key={post?._id}>
            <h2>{post?.title}</h2>
            <p>{post?.description}</p>
            <Link to={`/posts/${post?._id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => deleteHandler(post?._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default PostsList;
