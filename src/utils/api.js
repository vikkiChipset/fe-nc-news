import axios from "axios";
const api = axios.create({
  baseURL: "https://be-nc-news-hh3y.onrender.com/",
});
const getArticles = (params = {}) => {
  return api.get("api/articles", { params }).then((response) => {
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

const patchArticleVotes = (id, inc_votes) => {
  return api.patch(`api/articles/${id}`, { inc_votes }).then((response) => {
    return response.data.article;
  });
};

export { getArticles, getArticleById, getCommentsById, patchArticleVotes };
