import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function CommentCreate({ post_id, history }) {
  const [text, setText] = useState({
    nickname: "",
    content: "",
    postId: post_id,
  });
  const { nickname, content, postId } = text;
  const onChange = (e) => {
    const { value, name } = e.target;
    setText({
      ...text,
      [name]: value,
    });
  };
  const onCreate = () => {
    let formData = new FormData();

    formData.append("nickname", nickname);
    formData.append("content", content);
    formData.append("postId", postId);

    try {
      axios.post(
        `http://i5c207.p.ssafy.io/curation/post/${post_id}/commentList`,
        formData,
        {
          headers: {
            "Content-Type": `application/json`,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      댓글
      <input value={content} onChange={onChange} name="content" />
      <a href={`/articles/detail/${post_id}`}>
        <button onClick={onCreate}>등록</button>
      </a>
    </div>
  );
}

export default CommentCreate;
