import axios from "axios";
const api = axios.create({
  baseURL: "https://be-nc-news-hh3y.onrender.com/",
});

const getArticles = () => {
  return api.get("api/articles").then((response) => {
    return response.data.articles;
  });
};

const getArticleById = (id) => {
  return api.get(`api/articles/${id}`).then((response) => {
    return response.data.article;
  });
};

const getCommentsById = (id) => {
  return api.get(`api/articles/${id}/comments`).then((response) => {
    return response.data.comments;
  });
};

export { getArticles, getArticleById, getCommentsById };
