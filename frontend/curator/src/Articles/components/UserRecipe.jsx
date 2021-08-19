import React, { useEffect, useState } from "react";
import axios from "axios";
import UserRecipeDetail from "../page/UserRecipeDetail";

function UserRecipe({ match }) {
  const recipe_id = match.params.id;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setArticle(null);
        setLoading(true);
        const response = await axios.get(
          `http://i5c207.p.ssafy.io/curation/recipe/getRecipeDetail/${recipe_id}`
        );

        setArticle(response.data);
      } catch (e) {
        setError(e);
      }

      setLoading(false);
    };
    fetchArticle();
  }, [recipe_id]);
  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!article) return null;

  return (
    <>
      <UserRecipeDetail article={article} />
    </>
  );
}
export default UserRecipe;
