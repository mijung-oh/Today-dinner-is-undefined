import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import gif from "./images/123.gif";
import Media from "../page/Home";
function ArticleHome() {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // setError(null);
        setArticles(null);
        setLoading(true);
        const response = await axios.get(
          "http://localhost:9000/curation/post/list"
        );
        setArticles(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchArticles();
  }, []);
  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "300px",
        }}
      >
        <img src={gif} width="100px" />
      </div>
    );
  if (error) return <div>에러가 발생했습니다</div>;
  if (!articles) return null;
  return (
    <>
      <Link to="/articles/create">
        <button>create</button>
      </Link>

      <Media article={articles} />
    </>
  );
}

export default ArticleHome;
