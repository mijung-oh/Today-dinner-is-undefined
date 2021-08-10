// import React, { useCallback, useEffect, useState } from "react";
// import axios from "axios";
// import RecipePage from "../page/RecipePage";

// function RecipeList() {
// const [posts, setPosts] = useState([]);
// const [loading, setLoading] = useState(false);

// useEffect(() => {
//   const fetchPosts = async () => {
//     setLoading(true);
//     const res = await axios.get(
//       "http://i5c207.p.ssafy.io/curation/recipe/getAllRecipe"
//     );
//     setPosts(res.data);
//     setLoading(false);
//   };

//   fetchPosts();
// }, []);

//   return (
//     <div>
//       <RecipePage recipes={posts} loading={loading} />
//     </div>
//   );
// }

// export default RecipeList;
