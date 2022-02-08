import React, { useEffect, useState } from "react";
import axios from 'axios'
import "./FeaturedNews.css";
import api from "../../../utils/apiURL";
import useFetch from "../../../components/Hook/useFetch";
import Loading from "../../Loading/Loading";
import truncateDescription from "../../../utils/truncateDecription";
import imagePlaceHolder from "../../../utils/imagePlaceHolder";

const FeaturedNews = () => {
 const [data, loading, error]  = useFetch(api.featured)
 
 const news = data?.articles?.[0]
 
 console.log(news)
  
  return (
    <>
    {loading ? <Loading/> : error ? <h1>{error}</h1> :  <section className="blog-area pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="single-blog blog-style-eight">
                <div className="blog-image">
                  <img
                    className="featured_image_post"
                    src={news?.urlToImage ? news?.urlToImage : imagePlaceHolder}
                    alt="Blog"
                  />
                </div>
                <div className="blog-content">
                  <h4 className="featured-title">
                    <a target="_blank" href={news?.url}>
                      {truncateDescription(news?.title)}
                    </a>
                  </h4>
                  <span>
                    <i className="lni lni-calendar" /> Mar 23, 2022
                  </span>
                  <span>
                    <i className="lni lni-comments-alt" /> 24 Comment
                  </span>
                  <p className="text">
                    {truncateDescription(news?.description) !== undefined
                      ? truncateDescription(news?.description)
                      : truncateDescription(news?.content)}
                  </p>
                  <div className="rounded-buttons">
                    <a
                      target="_blank"
                      className="btn primary-btn-outline rounded-full"
                      href="/"
                    >
                      READ MORE
                    </a>
                  </div>
                </div>
              </div>
              {/* single blog */}
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="blog-author-one text-center">
                <div className="blog-image">
                  <img
                    src="https://cdn.ayroui.com/1.0/images/blog/b6.jpg"
                    alt="Blog"
                  />
                </div>
                <div className="blog-content">
                  <h6 className="sub-title">ABOUT ME</h6>
                  <h4 className="blog-title">
                    <a href="/">Jenny Gibbons</a>
                  </h4>
                  <p className="text">
                    Keith started his Managed by Q career as an On-Call Operator
                    with our service company Q Services, where he became
                    interested…
                  </p>
                  <a className="more" href="/">
                    READ MORE
                  </a>
                </div>
              </div>
              {/* single blog */}
            </div>
          </div>
          {/* row */}
        </div>
        {/* container */}
      </section>}
     
    </>
  );
};

export default FeaturedNews;
