import { getArticleById, patchArticleVotes, postComment } from "../utils/api";
import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Comments from "./Comments";
import { UserContext } from "../context/User";

const IndividualArticleCard = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [voteCount, setVoteCount] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const { loggedInUser } = useContext(UserContext);
  const [isError, setIsError] = useState(null);
  const [createdComment, setCreatedComment] = useState(null);

  useEffect(() => {
    getArticleById(article_id)
      .then((articleData) => {
        setArticle(articleData);
        setVoteCount(articleData.votes);
      })
      .catch(() => {
        setIsError("Article not found.");
      });
  }, [article_id]);

  const handleVote = (increment) => {
    const previousVoteCount = voteCount;
    setVoteCount((prevCount) => prevCount + increment);

    patchArticleVotes(article_id, increment).catch(() => {
      setVoteCount(previousVoteCount);
    });
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim()) {
      setFeedbackMessage("Comment cannot be empty.");
      return;
    }
    if (!loggedInUser) {
      setFeedbackMessage("You must be logged in to post a comment.");
      return;
    }

    setIsSubmitting(true);
    setFeedbackMessage("");

    const commentData = {
      username: loggedInUser.username,
      body: newComment,
    };

    postComment(article_id, commentData)
      .then((postedComment) => {
        //console.log(postedComment)
        setFeedbackMessage("Comment posted successfully!");
        setCreatedComment(postedComment);
        setNewComment("");
      })
      .catch(() => {
        setFeedbackMessage("Error posting comment. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (isError) {
    return (
      <div>
        <h2>404 - {isError}</h2>
        <p>The article you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div id="single-article">
      <h2>{article.title}</h2>
      <h5>Votes: {voteCount}</h5>
      <button onClick={() => handleVote(1)}>Vote +</button>
      <button onClick={() => handleVote(-1)}>Vote -</button>
      <h3>
        Posted on: {new Date(article.created_at).toLocaleDateString()}
      </h3>
      <img src={article.article_img_url} alt="Article" />
      <h3>{article.body}</h3>
      <h3>Topic: {article.topic}</h3>
      <h3>
        More articles in{" "}
        <Link to={`/articles?topic=${article.topic}`}>{article.topic}</Link>
      </h3>

      <h3>Post a comment</h3>
      {loggedInUser ? (
        <>
          <input
            placeholder="Type your comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={isSubmitting}
          />
          <button onClick={handleCommentSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </>
      ) : (
        <p>
          Please <Link to="/login">log in</Link> to post a comment.
        </p>
      )}
      {feedbackMessage && <p>{feedbackMessage}</p>}

      <Comments newComment={createdComment} />
    </div>
  );
};

export default IndividualArticleCard;
