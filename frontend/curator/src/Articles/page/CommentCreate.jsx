import axios from "axios";
import React, { useState } from "react";

function CommentCreate({ post_id }) {
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
        `http://I5C207.p.ssafy.io/curation/post/${post_id}/commentList`,
        formData,
        {
          headers: {
            "Content-Type": `application/json`,
          },
        },
        window.location.replace(
          `http://I5C207.p.ssafy.io/articles/detail/${post_id}`
        )
      );
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      댓글
      <input value={content} onChange={onChange} name="content" />
      <button onClick={onCreate}>등록</button>
    </div>
  );
}

export default CommentCreate;
