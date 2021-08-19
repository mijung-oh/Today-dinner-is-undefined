import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import axios from "axios";
import { Link } from "react-router-dom";
function UserScrap({ history }) {
  const prevState = history.location.state;
  const [scrap, setScrap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `http://i5c207.p.ssafy.io/curation/scrap/${prevState.user}/recipeList`
        );
        setScrap(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchArticles();
  }, [prevState.user]);

  if (loading) return <div>로딩중..</div>;
  if (error) return error.message;
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
      {scrap.map((item, keyindex) => (
        <Box
          key={keyindex}
          width={300}
          marginRight={2}
          my={4}
          py={5}
          style={{ marginBottom: "3px" }}
        >
          {item ? (
            <Link
              to={{
                pathname: `/userRecipe/detail/${item.recipe_ID}`,
                state: {
                  user: prevState.user,
                },
              }}
            >
              <img
                style={{ width: 300, height: 370, borderRadius: 10 }}
                src={item.img_URL}
                alt=""
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
