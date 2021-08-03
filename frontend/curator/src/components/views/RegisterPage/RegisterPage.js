import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import RegisterOrEdit from "./Sections/RegisterOrEdit";
import { articleActions } from "../../../slice/articleSlice";

function RegisterPage(props) {
  console.log(props);
  const dispatch = useDispatch();
  const { id, views, date, editDate, title, content } = useSelector(
    (state) => ({
      id: state.articleReducers.id,
      views: state.articleReducers.views,
      date: state.articleReducers.date,
      editDate: state.articleReducers.editDate,
      title: state.articleReducers.title,
      content: state.articleReducers.content,
    }),
    shallowEqual
  );
  const [TitleValue, setTitleValue] = useState(title);
  const [ContentValue, setContentValue] = useState(content);
  const [IsForUpdate, setIsForUpdate] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(props.location.search);
    if (searchParams.get("isForEdit") === "true") {
      dispatch(articleActions.fetchArticle(props.match.params.articleId));
      setIsForUpdate(true);
    }
    setTitleValue(title);
    setContentValue(content);
  }, [
    props.location.search,
    props.match.params.articleId,
    title,
    content,
    dispatch,
  ]);

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };
  const onContentChange = (event) => {
    setContentValue(event.currentTarget.value);
  };

  const onSubmitArticle = (event) => {
    event.preventDefault();
    if (TitleValue === "" || TitleValue === null || TitleValue === undefined) {
      alert("제목을 작성하십시오.");
      return false;
    }
    if (
      ContentValue === "" ||
      ContentValue === null ||
      ContentValue === undefined
    ) {
      alert("내용을 작성하십시오.");
      return false;
    }
    const article = {
      id: id,
      title: TitleValue,
      content: ContentValue,
      views: views,
      date: date,
      editDate: IsForUpdate ? Date.now() : editDate,
    };
    if (IsForUpdate) {
      dispatch(articleActions.updateArticle(article));
    } else {
      dispatch(articleActions.registerArticle(article));
    }
  };

  return (
    <>
      <RegisterOrEdit
        titleValue={TitleValue}
        contentValue={ContentValue}
        handleTitleChange={onTitleChange}
        handleContentChange={onContentChange}
        handleSubmit={onSubmitArticle}
        updateRequest={IsForUpdate}
      />
    </>
  );
}
export default RegisterPage;
