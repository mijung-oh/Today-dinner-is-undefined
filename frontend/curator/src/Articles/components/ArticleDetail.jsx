import React, { useEffect, useState } from "react";
import axios from "axios";
import DetailPage from "../page/DetailPage";
import gif from "./images/123.gif";

import { loginAlert } from "./Alert";
function ArticleDetail({ match, history }) {
  const post_id = match.params.id;
  const prevState = history.location.state;

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const authLogin = async () => {
      const auth = await axios.get(
        "http://i5c207.p.ssafy.io:9000/curation/currentLogin/test"
      );
      if (auth.data.nickname === "") {
        loginAlert();
      }
      setUser(auth.data.nickname);
    };
    const fetchArticle = async () => {
      try {
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
    axios.delete(`http://i5c207.p.ssafy.io/curation/post/${post_id}`);
    history.push("/articles");
  };
  return (
    <>
      <DetailPage article={article} onDelete={onDelete} user={user} />
    </>
  );
}

export default ArticleDetail;
