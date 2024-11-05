import { getArticleById } from "../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";

const IndividualArticleCard = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    getArticleById(article_id).then((articleData) => {
      setArticle(articleData);
    });
  }, [article_id]);

  return (
    <>
      <div id="single-article">
        <h2>{article.title}</h2>
        <h3>{article.votes}</h3>
        <h3>
          Posted on: {new Date(article.created_at).toLocaleDateString()} by{" "}
          {article.author}
        </h3>
        <img src={article.article_img_url} alt="image" />
        <h3>{article.body}</h3>
        <h3>{article.topic}</h3>
        {/* do it later */}
        <h3>More articles in //put the same topic later</h3>
        <Comments />
        <h3>Post comment</h3>
        <h3>Show and hide comments</h3>
      </div>
    </>
  );
};

export default IndividualArticleCard;
