import React, { useState, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import Comment from "../../components/views/ArticlePage/Section/Comment";
import { articleActions } from "../../slice/articleSlice";
import { commentActions } from "../../slice/commentSlice";
import ArticleDetail from "./section/ArticleDetail";

function ArticlePage({ match, location }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(articleActions.getArticle(match.params.articleId));
    dispatch(commentActions.getComments(match.params.articleId));
  }, [match.params.articleId]);
  const comments = useSelector((state) => state.commentReducers.comments);
  const { id, title, content, date } = useSelector(
    (state) => ({
      id: state.articleReducers.id,
      title: state.articleReducers.title,
      content: state.articleReducers.content,
      date: state.articleReducers.date,
    }),
    shallowEqual
  );
  const views = useSelector((state) => state.articleReducers.views);
  const onDeleteClick = () => {
    if (!window.confirm("삭제하시겠습니까?")) return false;
    dispatch(articleActions.deleteArticle(id));
  };
  const [CommentValue, setCommentValue] = useState("");
  const onCommentChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };
  const onCommentSubmit = () => {
    if (
      CommentValue === "" ||
      CommentValue === null ||
      CommentValue === undefined
    ) {
      alert("댓글을 입력하십시오.");
      return false;
    }
    const comment = {
      id: 0,
      content: CommentValue,
      date: Date.now(),
      articleId: id,
    };
    dispatch(commentActions.registerComment(comment));
  };

  const onDeleteComment = (commentId) => {
    dispatch(commentActions.deleteComment(commentId));
  };

  return (
    <div style={{ width: "80%", margin: "3rem auto" }}>
      <div>
        <ArticleDetail
          id={id}
          title={title}
          content={content}
          views={views}
          date={date}
          handleDeleteClick={onDeleteClick}
          handleComment={
            <Comment
              comment={CommentValue}
              handleCommentChange={onCommentChange}
              handleCommentSubmit={onCommentSubmit}
            />
          }
          loadComments={comments}
          deleteComment={onDeleteComment}
        />
      </div>
    </div>
  );
}
export default ArticlePage;
