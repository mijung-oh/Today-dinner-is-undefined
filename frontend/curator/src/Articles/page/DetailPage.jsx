import React from "react";
import { Link } from "react-router-dom";
function DetailPage({ article, onDelete }) {
  /*
  props article 안에 백 서버에 있는 필드 모든 값이 담겨 있음
  onDelete = 게시물 삭제 (백연동)
  25번쨰 줄 홈에서와 마찬가지로 임시방편으로 a테그
  */
  return (
    <div>
      {article.imagePath.map((img) => (
        <div>
          <img src={img} />
        </div>
      ))}

      <h3>제목: {article.title}</h3>
      <h5>설명: {article.description}</h5>
      <h5>재료: {article.ingredients}</h5>
      <h5>작성자: {article.user}</h5>
      <h5>작성시간: {article.createDate}</h5>
      <Link to={`/articles/update/${article.id}`}>
        <button>수정</button>
      </Link>
      <br />
      <a href="/articles">
        <button onClick={() => onDelete(article.id)}>X</button>
      </a>
    </div>
  );
}

export default DetailPage;
