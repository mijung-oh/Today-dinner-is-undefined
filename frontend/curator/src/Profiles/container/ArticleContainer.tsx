import React from "react";
import Articles from "@profiles/components/Articles";
import DefaultArticle from "@profiles/components/DefaultArticle";
import { v4 as uuidv4 } from "uuid";
import { ArticleProps } from "@lib/interfaces";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
}));

interface ContainerProps {
  fetchedMypagePostDtos: Array<[ArticleProps]>;
}
const ArticleContainer: React.FC<ContainerProps> = (props) => {
  const classes = useStyles();
  const ishave: boolean = props.fetchedMypagePostDtos.length > 0;

  return (
    <>
      <div className={classes.container}>
        {!ishave ? (
          <DefaultArticle />
        ) : (
          props.fetchedMypagePostDtos.map((article: any) => {
            return (
              <Articles
                key={uuidv4()}
                title={article.title}
                description={article.description}
                imagePaths={article.imagePaths}
                ingredients={article.ingredients}
                createDate={article.create_date}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default ArticleContainer;
