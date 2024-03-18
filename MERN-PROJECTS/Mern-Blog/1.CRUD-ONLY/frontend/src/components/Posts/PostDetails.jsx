import React from "react";
import { useParams } from "react-router-dom";
import { fetchPost } from "../../APIServices/posts/postsAPI";
import { useQuery } from "@tanstack/react-query";

const PostDetails = () => {
  // !Get the post id
  const { postId } = useParams();
  // ! use query
  const { isError, isLoading, data, error, isSuccess } = useQuery({
    queryKey: ["post-details"],
    queryFn: () => fetchPost(postId),
  });
  console.log(data);
  return (
    <div>
      <h1>{data?.postFound.title}</h1>
      <p>{data?.postFound.description}</p>
    </div>
  );
};

export default PostDetails;
