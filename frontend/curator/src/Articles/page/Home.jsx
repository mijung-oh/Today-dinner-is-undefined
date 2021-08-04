import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Home({ article }) {
  const onDelete = () => {
    axios.delete(`http://localhost:9000/curation/post/${article.id}`);
  };
  /*
  article 안에 백 서버 안에 있는 모든 필드값 담겨있음
  26번째 줄 삭제는 되는데 새로고침 // 재렌더링? 이 안되서 일단 임시방편으로 a테그
  */
  return (
    <div>
      <Link to="/articles/create">
        <button>create</button>
      </Link>
      <div>
        <div>
          <img src={article.imagePath} />
        </div>
        <h5>
          <Link to={`/articles/detail/${article.id}`}>
            컨텐트: {article.description}
          </Link>
          글번호: {article.id} // // 작성자: {article.user} // 작성시간:{" "}
          {article.createDate}
          <a href="/articles">
            <button onClick={() => onDelete(article.id)}>x</button>
          </a>
        </h5>
      </div>
    </div>
  );
}

export default Home;
