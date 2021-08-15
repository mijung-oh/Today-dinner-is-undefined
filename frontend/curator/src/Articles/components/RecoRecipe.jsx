import axios from "axios";
import React, { useEffect, useState } from "react";
import RecoRecipePage from "../page/RecoRecipePage";

function RecoRecipe({ match }) {
  const RecoID = match.params.id;

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // setError(null);
        setArticle(null);
        setLoading(true);
        const response = await axios.get(
          `http://i5c207.p.ssafy.io/curation/recipe/getRecipeDetail/${RecoID}`
        );

        setArticle(response.data);
      } catch (e) {
        setError(e);
      }

      setLoading(false);
    };
    fetchArticle();
  }, []);
  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!article) return null;
  return <RecoRecipePage article={article} />;
}

export default RecoRecipe;
