import React, { useEffect } from "react";
import Articles from "@components/Articles";
import "./ArticleContainer.scss";
import { v4 as uuidv4 } from "uuid";
import { ArticleProps } from "@components/lib/interfaces";

interface ContainerProps {
  // fetchedMypagePostDtos: Array<{
  //   title: string;
  //   description: string;
  //   imagePaths: any;
  //   ingredients: string;
  //   create_date: string;
  // }>;
  fetchedMypagePostDtos: Array<[ArticleProps]>;
}
//React.FC<ContainerProps>
const ArticleContainer: React.FC<ContainerProps> = (props) => {
  console.log("안쪽", props.fetchedMypagePostDtos);
  const Posts = props.fetchedMypagePostDtos;
  console.log("posts", Posts);
  return (
    <>
      <div className="container">
        {props.fetchedMypagePostDtos.map((article: any) => {
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
        })}
      </div>
    </>
  );
};

export default ArticleContainer;
