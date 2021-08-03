import React from "react";
import Articles from "@profiles/components/Articles";
import DefaultArticle from "@profiles/components/DefaultArticle";
import "./ArticleContainer.scss";
import { v4 as uuidv4 } from "uuid";
import { ArticleProps } from "@lib/interfaces";

interface ContainerProps {
  fetchedMypagePostDtos: Array<[ArticleProps]>;
}
const ArticleContainer: React.FC<ContainerProps> = (props) => {
  const ishave: boolean = props.fetchedMypagePostDtos.length > 0;
  console.log(ishave);
  return (
    <>
      <div className="container">
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
