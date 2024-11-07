import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getCommentsById, deleteComment } from "../utils/api";
import HideShow from "./HideShow";
import { UserContext } from "../context/User";

export default function Comments() {
  const { article_id } = useParams();
  const { loggedInUser } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getCommentsById(article_id)
      .then((commentData) => {
        setComments(commentData);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [article_id]);

  const handleDelete = (commentId) => {
    setDeletingCommentId(commentId);
    deleteComment(commentId)
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== commentId)
        );
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setDeletingCommentId(null);
      });
  };

  if (isLoading) return <p>Loading comments...</p>;
  if (isError) return <p>Failed to load comments. Please try again.</p>;

  return (
    <div className="comments">
      <h3>All comments:</h3>
      <HideShow contentType={"comments"}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.comment_id} className="comment">
              <p>
                <strong>{comment.author}</strong> commented:
              </p>
              <p>{comment.body}</p>
              <p>Posted on: {new Date(comment.created_at).toLocaleString()}</p>
              {loggedInUser && loggedInUser.username === comment.author && (
                <button
                  onClick={() => handleDelete(comment.comment_id)}
                  disabled={deletingCommentId === comment.comment_id}
                >
                  {deletingCommentId === comment.comment_id
                    ? "Deleting..."
                    : "Delete"}
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </HideShow>
    </div>
  );
}
