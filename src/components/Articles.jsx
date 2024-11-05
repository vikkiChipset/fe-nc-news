import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://be-nc-news-hh3y.onrender.com/api/articles")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        return response.json();
      })
      .then((data) => setArticles(data.articles));
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="articles">
      <h1>All Articles</h1>
      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </div>
  );
}
