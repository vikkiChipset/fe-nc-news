import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Articles from "./components/Articles";
import Login from "./components/Login";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/articles" element={<Articles />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
