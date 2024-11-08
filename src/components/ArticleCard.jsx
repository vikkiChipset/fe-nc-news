import { Link } from "react-router-dom";
import { useState } from "react";
import { patchArticleVotes } from "../utils/api";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ArticleCard(props) {
  const { article } = props;
  const [voteCount, setVoteCount] = useState(article.votes);
  const handleVote = (increment) => {
    const previousVoteCount = voteCount;
    setVoteCount((prevCount) => prevCount + increment);
    patchArticleVotes(article.article_id, increment).catch(() => {
      setVoteCount(previousVoteCount);
    });
  };
  return (
    
      <div className="article-card">
        <h2>{article.title}</h2>
        <Link to={`/articles/${article.article_id}`}>
          <img
            src={article.article_img_url}
            alt={article.title}
            className="img-fluid rounded mb-3"
          />
        </Link>
        <p>
          <strong>Votes:</strong> {voteCount}
        </p>
        <div className="d-flex justify-content-center gap-2 mb-3">
          <button
            className="btn btn-outline-success"
            onClick={() => handleVote(1)}
          >
            Vote +
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => handleVote(-1)}
          >
            Vote -
          </button>
        </div>
        <p>
          <strong>Topic:</strong> {article.topic}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(article.created_at).toLocaleDateString()}
        </p>
        <p>
          <strong>Comments:</strong> {article.comment_count}
        </p>
      </div>
    
  );
}
