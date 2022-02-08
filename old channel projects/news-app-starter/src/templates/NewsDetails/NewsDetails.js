import React from "react";

import "./NewsDetails.css";

const NewsDetails = () => {
  return (
    <>
      <div className="col-lg-4 col-md-8 col-sm-10">
        <div className="single-blog blog-style-one">
          <div className="single-blog blog-style-one">
            <div className="blog-image">
              <a href="/">
                {/* <img
                  className="blog-image"
                  src={imageUrl ? imageUrl : imagePlaceHolder}
                  alt="Blog"
                /> */}
              </a>
              <a href="/" className="category">
                {/* {source} */}
              </a>
            </div>
            <div className="blog-content">
              <h5 className="blog-title">
                {/* <a href="/">{truncateDescription(title)}</a> */}
              </h5>
              <span>
                <i className="lni lni-calendar" /> Mar 23, 2022
              </span>
              <span>
                <i className="lni lni-comments-alt" /> 24 Comment
              </span>

              <p className="text">
                {/* {truncateDescription(description) !== undefined
                  ? truncateDescription(description)
                  : truncateDescription(content)} */}
              </p>
              {/* <a target="_blank" className="more" href={url}>
                READ MORE
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsDetails;
