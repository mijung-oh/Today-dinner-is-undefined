import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserScrap() {
  const [scrap, setScrap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // setError(null);
        setScrap(null);
        setLoading(true);
        const response = await axios.get(
          "http://localhost:9000/curation/scrap/오잉/recipeList"
        );
        setScrap(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchArticles();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!scrap) return null;
  return (
    <div>
      {scrap.map((list) => (
        <Link to={`/recipe/detail/${list.recipe_ID}`}>
          <h1>{list.recipe_NM_KO}</h1>
          <img src={list.img_URL} />
        </Link>
      ))}
    </div>
  );
}

export default UserScrap;
