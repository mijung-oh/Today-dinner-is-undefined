import React from "react";
import Articles from "@components/Articles";
import "./ArticleContainer.scss";
const ArticleContainer: React.FC = () => {
  return (
    <div className="container">
      <Articles />
      <Articles />
      <Articles />
      <Articles />
    </div>
  );
};

export default ArticleContainer;
