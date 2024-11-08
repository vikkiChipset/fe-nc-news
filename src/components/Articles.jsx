import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticles } from "../utils/api";
import ArticleCard from "./ArticleCard";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isError, setIsError] = useState(null);

  const topic = searchParams.get("topic");
  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setIsLoading(true);
    setIsError(null);

    getArticles({ topic, sort_by: sortBy, order })
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError("Topic not found.");
        setIsLoading(false);
      });
  }, [topic, sortBy, order]);

  const handleSortChange = (e) => {
    const [newSortBy, newOrder] = e.target.value.split(":");
    setSearchParams({ topic: topic || "", sort_by: newSortBy, order: newOrder });
  };

  if (isLoading) return <p>Loading articles...</p>;

  if (isError && topic !=="null") {
    return (
      <div>
        <h2>404 - {isError}</h2>
        <p>The topic you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="articles-list">
      <h2>
        {topic && topic !=="null"
          ? `${topic.charAt(0).toUpperCase() + topic.slice(1)} Articles`
          : "All Articles"}
      </h2>

      <div className="sort-dropdown">
        <label htmlFor="sort-by">Sort by: </label>
        <select
          id="sort-by"
          onChange={handleSortChange}
          value={`${sortBy}:${order}`}
        >
          <option value="created_at:desc">Newest</option>
          <option value="created_at:asc">Oldest</option>
          <option value="comment_count:desc">Most Comments</option>
          <option value="comment_count:asc">Least Comments</option>
          <option value="votes:desc">Most Votes</option>
          <option value="votes:asc">Least Votes</option>
        </select>
      </div>
      <div className="row gx-4 gy-4">
      {articles.length > 0 ? (
  
        articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))
      ) : (
        <p>No articles available for this topic.</p>
      )}
      </div>
    </div>
  );
}
