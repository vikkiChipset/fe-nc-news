import { Link } from "react-router-dom";
export default function ArticleCard(props) {
  const { article } = props;
  return (
    <div className="article-card">
      <Link to={`/articles/${article.article_id}`}>
        <img src={article.article_img_url} alt={article.title} />
      </Link>
      <h2>{article.title}</h2>
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
