import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Articles from "./components/Articles";
import Login from "./components/Login";
import IndividualArticleCard from "./components/IndividualArticleCard";
import Home from "./components/Home";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route
          path="/articles/:article_id"
          element={<IndividualArticleCard />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
