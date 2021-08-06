import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Home from "../page/Home";

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
          "http://I5C207.p.ssafy.io/curation/post/list"
        );
        setArticles(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchArticles();
  }, []);
  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!articles) return null;
  console.log("test: ", articles);
  return (
    <>
      <Link to="/articles/create">
        <button>create</button>
      </Link>
      {articles.map((article) => (
        <div key={article.id}>
          <Home article={article} />
        </div>
      ))}
    </>
  );
}

export default ArticleHome;
