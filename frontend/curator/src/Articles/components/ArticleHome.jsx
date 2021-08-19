import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import gif from "./images/123.gif";
import Media from "../page/Home";
import { loginAlert } from "./Alert";
function ArticleHome() {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [postId, setPostId] = useState("");
  const authLogin = async () => {
    const config = {
      withCredentials: true,
    };
    const auth = await axios.get(
      "http://i5c207.p.ssafy.io:9000/curation/currentLogin",
      config
    );
    if (auth.data.nickname === "") {
      loginAlert();
    }
    setUser(auth.data.nickname);
  };
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // setError(null);
        setArticles(null);
        setLoading(true);
        const config = {
          withCredentials: true,
        };
        const response = await axios.get(
          "http://i5c207.p.ssafy.io/curation/post/list",
          config
        );

        setArticles(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchArticles();
    authLogin();
  }, []);
  const IdCheck = async () => {
    const config = {
      withCredentials: true,
    };
    const response = axios
      .get("http://i5c207.p.ssafy.io/curation/post/list", config)
      .then((res) => {
        let post_id = res.data[res.data.length - 1].id;
        setPostId(post_id);
      });
  };
  IdCheck();
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
      <Media article={articles} user={user} />
    </>
  );
}

export default ArticleHome;
