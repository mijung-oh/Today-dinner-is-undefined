import axios from "axios";
import React, { useEffect, useState } from "react";

function CommentList({ post_id }) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // setError(null);
        setArticle(null);
        setLoading(true);
        const response = await axios.get(
          `http://i5c207.p.ssafy.io/curation/post/${post_id}`
        );

        setArticle(response.data);
      } catch (e) {
        setError(e);
      }

      setLoading(false);
    };
    fetchArticle();
  }, []);
  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!article) return null;
  const onDelete = (comment_id) => {
    axios.delete(
      ` http://i5c207.p.ssafy.io/curation/post/${post_id}/commentList/${comment_id}`
    );
    console.log("testtest ", post_id, comment_id);
  };
  const onCommentChange = () => {};

  return (
    <div>
      {article.comment.map((content) => (
        <li key={content.id}>
          {content.content}
          <button onClick={onCommentChange}>수정</button>
          <a href={`/articles/detail/${post_id}`}>
            <button onClick={() => onDelete(content.id)}>삭제</button>
          </a>
        </li>
      ))}
    </div>
  );
}

export default CommentList;
