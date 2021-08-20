import React, { useEffect, useState } from "react";
import axios from "axios";
import DetailPage from "../page/DetailPage";
import gif from "./images/123.gif";

function ArticleDetail({ match, history }) {
  const post_id = match.params.id;
  const prevState = history.location.state;

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const authLogin = async () => {
      const config = {
        withCredentials: true,
      };
      const auth = await axios.get(
        "http://i5c207.p.ssafy.io:9000/curation/currentLogin",
        config
      );
      if (auth.data.nickname === "") {
      }
      setUser(auth.data.nickname);
    };
    const fetchArticle = async () => {
      try {
        setArticle(null);
        setLoading(true);
        const config = {
          withCredentials: true,
        };
        const response = await axios.get(
          `http://i5c207.p.ssafy.io/curation/post/${post_id}`,
          config
        );

        setArticle(response.data);
      } catch (e) {
        setError(e);
      }

      setLoading(false);
    };
    authLogin();
    fetchArticle();
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
  if (!article) return null;

  const onDelete = (post_id) => {
    const config = {
      withCredentials: true,
    };
    axios.delete(`http://i5c207.p.ssafy.io/curation/post/${post_id}`, config);
    history.push("/articles");
  };
  return (
    <>
      <DetailPage
        article={article}
        onDelete={onDelete}
        user={prevState.nickname}
      />
    </>
  );
}

export default ArticleDetail;
