import { useState } from "react";

export default function HideShow({ children, contentType }) {
  const [isShowing, setIsShowing] = useState(false);

  function toggleContent() {
    setIsShowing((currIsShowing) => {
      return !currIsShowing;
    });
  }

  return (
    <>
      <button className="hidden-button" onClick={toggleContent}>
        {isShowing ? "Hide" : "Show"} {contentType}
      </button>
      {isShowing && children}
    </>
  );
}
