import React, { useState, useEffect } from "react";
import axios from "axios";
import useIntersect from "./useintersect";
import RecipePage from "../page/RecipePage";
import gif from "./images/123.gif";
import { loginAlert } from "./Alert";

const fakeFetch = (delay = 1000) =>
  new Promise((res) => setTimeout(res, delay));

function RecipeList() {
  const [posts, setPosts] = useState([]);
  const [check, setCheck] = useState([]);
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
        loginAlert();
      }
    };
    const fetchPosts = async () => {
      const config = {
        withCredentials: true,
      };
      const res = await axios.get(
        "http://i5c207.p.ssafy.io/curation/scrap/getAllRecipe/orderByScrapCount",
        config
      );
      setPosts(res.data);
    };

    authLogin();
    fetchPosts();
  }, []);

  const [state, setState] = useState({ itemCount: 0, isLoading: false });
  const fetchItems = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    await fakeFetch();
    setState((prev) => ({
      itemCount: prev.itemCount + 6,
      isLoading: false,
    }));
  };
  useEffect(() => {
    fetchItems();
  }, []);
  const [_, setRef] = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    await fetchItems();
    observer.observe(entry.target);
  }, {});
  const { itemCount, isLoading } = state;
  if (!itemCount) return null;

  return (
    <div style={{ padding: "50px", textAlign: "center" }} className="App">
      {[...Array(itemCount)].map((_, i) => {
        return (
          <>
            <RecipePage key={i} allRecipe={posts[i]} />
          </>
        );
      })}
      <div ref={setRef} className="Loading">
        {isLoading && <img src={gif} width="100px" />}
      </div>
    </div>
  );
}

export default RecipeList;
