import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import { Avatar } from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
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
          "http://i5c207.p.ssafy.io/curation/scrap/오잉/recipeList"
        );
        setScrap(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchArticles();
  }, []);
  console.log("TES", scrap);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!scrap) return null;
  return (
    <Grid
      container
      wrap="wrap"
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "column",
        padding: "10px",
        width: "100%",
      }}
    >
      {scrap.map((item) => (
        <Box
          key={item.id}
          width={300}
          marginRight={3}
          my={4}
          py={5}
          style={{ marginBottom: "3px" }}
        >
          {item ? (
            <Link to={`/userRecipe/detail/${item.recipe_ID}`}>
              <img
                style={{ width: 290, height: 300, borderRadius: 10 }}
                src={item.img_URL}
              />
            </Link>
          ) : (
            <Skeleton variant="rect" width={210} height={118} />
          )}

          {item ? (
            <Box pr={2}>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <Typography
                  style={{
                    fontWeight: "bold",
                    margin: "10px",
                  }}
                >
                  {item.recipe_NM_KO} <br />
                  <Typography style={{ fontSize: "15px" }}>
                    {item.sumry}
                  </Typography>
                </Typography>
              </div>
              <Typography
                display="block"
                variant="caption"
                color="textSecondary"
              >
                {item.channel}
              </Typography>
              <Typography variant="caption" color="textSecondary"></Typography>
            </Box>
          ) : (
            <Box pt={0.5}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          )}
        </Box>
      ))}
    </Grid>
  );
}

export default UserScrap;
