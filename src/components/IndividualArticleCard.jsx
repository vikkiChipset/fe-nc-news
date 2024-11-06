import { getArticleById, patchArticleVotes } from "../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import { Link } from "react-router-dom";

const IndividualArticleCard = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [voteCount, setVoteCount] = useState(0);

  useEffect(() => {
    getArticleById(article_id).then((articleData) => {
      setArticle(articleData);
      setVoteCount(articleData.votes);
    });
  }, [article_id]);

  const handleVote = (increment) => {
    const previousVoteCount = voteCount;
    setVoteCount((prevCount) => prevCount + increment);

    patchArticleVotes(article_id, increment).catch(() => {
      setVoteCount(previousVoteCount);
    });
  };

  return (
    <div id="single-article">
      <h2>{article.title}</h2>
      <h5>Votes: {voteCount}</h5>
      <button onClick={() => handleVote(1)}>Vote +</button>
      <button onClick={() => handleVote(-1)}>Vote -</button>
      <h3>
        Posted on: {new Date(article.created_at).toLocaleDateString()} by{" "}
        {article.author}
      </h3>
      <img src={article.article_img_url} alt="image" />
      <h3>{article.body}</h3>
      <h3>Topic: {article.topic}</h3>
      <h3>
        More articles in{" "}
        <Link to={`/articles?topic=${article.topic}`}>{article.topic}</Link>
      </h3>
      <Comments />
    </div>
  );
};

export default IndividualArticleCard;
