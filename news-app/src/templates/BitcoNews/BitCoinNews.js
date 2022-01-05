import React from "react";
import useFetch from "../../components/Hook/useFetch";
import api from "../../utils/apiURL";
import Loading from "../Loading/Loading";
import NewsDetails from "../NewsDetails/NewsDetails";
import "./BitcoinNews.css";

const BitcoinNews = () => {
  const [data, loading, error]  = useFetch(api.bitcoin)
  return (
    <section className="blog-area pb-5 mt-3">
      <div className="container">
        <h2 class="title">Bitcoin News</h2>
        <div className="row justify-content-center">
          {/* Content start here */}
          {loading? <Loading/>: error ? <h1>{error}</h1>:data?.articles?.map((news) => {
            return <NewsDetails  
            imageUrl={news.urlToImage}
                  title={news?.title}
                  description={news?.description}
                  publishedAt={news?.publishedAt}
                  url={news?.url}
                  content={news?.content}
                  source={news?.source?.name}
            />
          })}
          {/* Content ends here */}
        </div>
        {/* row */}
      </div>
      {/* container */}
    </section>
  );
};

export default BitcoinNews;
