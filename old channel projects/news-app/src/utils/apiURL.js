const api = {
  bbc: `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${process.env.REACT_APP_NEWS_KEY}`,
  bitcoin:
    `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${process.env.REACT_APP_NEWS_KEY}`,
  trump:
    `https://newsapi.org/v2/top-headlines?q=trump&apiKey=${process.env.REACT_APP_NEWS_KEY}`,
  techcrunch:
    `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${process.env.REACT_APP_NEWS_KEY}`,
  featured:
    `https://newsapi.org/v2/top-headlines?country=&category=business&apiKey=${process.env.REACT_APP_NEWS_KEY}`,
};

export default api;
