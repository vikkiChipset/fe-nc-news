import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [showTopics, setShowTopics] = useState(false);

  return (
    <header>
      <h1>NC News</h1>
      <Link to="/">
        <img
          src="/ironman.png"
          alt="ironman"
          style={{ width: "100px", height: "auto" }}
        />
      </Link>
      <nav>
        <Link to="/articles">All Articles</Link>
        <div
          className="dropdown"
          onMouseEnter={() => setShowTopics(true)}
          onMouseLeave={() => setShowTopics(false)}
        >
          <span className="dropdown-title">Topics</span>
          {showTopics && (
            <div className="dropdown-content">
              <Link to="/articles?topic=coding">Coding</Link>
              <Link to="/articles?topic=football">Football</Link>
              <Link to="/articles?topic=cooking">Cooking</Link>
            </div>
          )}
        </div>
        <Link to="/login">Log in / Sign in</Link>
      </nav>
    </header>
  );
}
