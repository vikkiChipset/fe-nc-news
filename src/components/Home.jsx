import { useEffect, useState, useContext } from "react";
import ArticleCard from "./ArticleCard";
import { getArticles } from "../utils/api";
import { UserContext } from "../context/User";
import { Link } from "react-router-dom";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    getArticles({ sort_by: "votes", order: "desc" })
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading articles...</p>;
  if (isError) return <p>Failed to load articles. Please try again.</p>;

  return (
    <div>
      <div>
        {loggedInUser ? (
          <div>
            <h1>Welcome back, {loggedInUser.name}!</h1>
          </div>
        ) : (
          <h1>
            Welcome to NC News! Please <Link to="/login">log in.</Link>
          </h1>
        )}
      </div>

      <h2>Take a look at our most popular articles:</h2>
      <div className="three-articles-design">
        {articles.slice(0,3).map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </div>
  );
}
