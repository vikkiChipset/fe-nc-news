import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCommentsById } from "../utils/api";
import HideShow from "./HideShow";

export default function Comments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  

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
              <p>
                Posted on: {new Date(comment.created_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </HideShow>
    </div>
  );
}
