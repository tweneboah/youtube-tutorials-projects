import React, { useEffect } from "react";

const TrumpNews = () => {
  return (
    <section className="blog-area pb-5 mt-3">
      <div className="container">
        <h2 class="title">Trump News</h2>
        <div className="row justify-content-center">
          {/* Content start here */}
          {/* 
          {loading ? (
            <Loading />
          ) : (
            data?.articles?.map((newRes) => {
              return (
                <NewsDetails
                  imageUrl={newRes.urlToImage}
                  title={newRes?.title}
                  description={newRes?.description}
                  publishedAt={newRes?.publishedAt}
                  url={newRes?.url}
                  content={newRes?.content}
                  source={newRes?.source?.name}
                />
              );
            })
          )} */}
          {/* Content ends here */}
        </div>
        {/* row */}
      </div>
      {/* container */}
    </section>
  );
};

export default TrumpNews;
