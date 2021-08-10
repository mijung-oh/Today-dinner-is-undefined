import React, { useEffect, useState } from "react";
import axios from "axios";
import DetailPage from "../page/DetailPage";

function ArticleDetail({ match }) {
  const post_id = match.params.id;

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
          `http://i5c207.p.ssafy.io/curation/post/${post_id}`
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

  const onDelete = (post_id) => {
    axios.delete(`http://i5c207.p.ssafy.io/curation/post/${post_id}`);
    // history.push("/articles");
  };
  // const onLike = async () => {
  //   let formData = new FormData();

  //   formData.append("nickname", "오잉");

  //   const response = await axios.post(
  //     `http://localhost:9000/curation/like/${post_id}`,
  //     formData,
  //     {
  //       headers: {
  //         "Content-Type": `application/json`,
  //       },
  //     }
  //   );
  // };

  return (
    <>
      <DetailPage article={article} onDelete={onDelete} />
    </>
  );
}

export default ArticleDetail;
