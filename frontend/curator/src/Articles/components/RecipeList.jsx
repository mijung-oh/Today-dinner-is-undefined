import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./style.css";
import useIntersect from "./useintersect";
import RecipePage from "../page/RecipePage";
import gif from "./images/123.gif";

const fakeFetch = (delay = 1000) =>
  new Promise((res) => setTimeout(res, delay));

function RecipeList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        "http://i5c207.p.ssafy.io/curation/recipe/getAllRecipe"
      );
      setPosts(res.data);
    };

    fetchPosts();
  }, []);

  const [state, setState] = useState({ itemCount: 0, isLoading: false });
  /* fake async fetch */
  const fetchItems = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    await fakeFetch();
    setState((prev) => ({
      itemCount: prev.itemCount + 8,
      isLoading: false,
    }));
  };
  /* initial fetch */
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
    <div style={{ backgroundColor: "grey", padding: "50px" }} className="App">
      {[...Array(itemCount)].map((_, i) => {
        return <RecipePage key={i} allRecipe={posts[i]} />;
      })}
      <div ref={setRef} className="Loading">
        {isLoading && <img src={gif} width="100px" />}
      </div>
    </div>
  );
}

export default RecipeList;
