import React from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchPost, updatePostAPI } from "../../APIServices/posts/postsAPI";
import { useMutation, useQuery } from "@tanstack/react-query";

const UpdatePost = () => {
  // !Get the post id
  const { postId } = useParams();
  // ! use query
  const { data } = useQuery({
    queryKey: ["post-details"],
    queryFn: () => fetchPost(postId),
  });
  console.log(data);
  // post mutation
  const postMutation = useMutation({
    mutationKey: ["update-post"],
    mutationFn: updatePostAPI,
  });
  const formik = useFormik({
    // initial data
    initialValues: {
      title: data?.postFound?.title || "",
      description: data?.postFound?.description || "",
    },
    enableReinitialize: true,
    // validation
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    // submit
    onSubmit: (values) => {
      const postData = {
        title: values.title,
        description: values.description,
        postId,
      };
      postMutation.mutate(postData);
    },
  });
  //get loading state
  const isLoading = postMutation.isPending;
  //isErr
  const isError = postMutation.isError;
  //success
  const isSuccess = postMutation.isSuccess;
  //Error
  const error = postMutation.error;
  return (
    <div>
      <h1> You are editing -{data?.postFound.title}</h1>
      <div>
        {isLoading && <p>Loading...</p>}
        {isSuccess && !isError && <p>Post updated successfully</p>}
        {isError && <p>{error.message}</p>}
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            {...formik.getFieldProps("title")}
          />
          {/* display err msg */}
          {formik.touched.title && formik.errors.title && (
            <span style={{ color: "red" }}>{formik.errors.title}</span>
          )}
          <input
            type="text"
            name="description"
            placeholder="Enter description"
            {...formik.getFieldProps("description")}
          />
          {/* display err msg */}
          {formik.touched.description && formik.errors.description && (
            <span style={{ color: "red" }}>{formik.errors.description}</span>
          )}
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
