import React, { useState } from "react";
import axios from "axios";
import Update from "../page/Update";
import { history } from "react-router-dom";

function ArticleUpdate({ history, match }) {
  const prevState = history.location.state;
  const post_id = match.params.id;
  console.log("idtest", prevState);
  const [postfiles, setPostfiles] = useState({
    file: [],
    previewURL: "",
  });

  const uploadFile = (e) => {
    e.stopPropagation();
    let reader = new FileReader();
    let file = e.target.files[0];
    const filesInArr = Array.from(e.target.files);

    reader.onloadend = () => {
      setPostfiles({
        file: filesInArr,
        previewURL: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const [text, setText] = useState({
    title: prevState.title,
    description: prevState.description,
    ingredients: prevState.ingredients,
  });
  const { title, description, ingredients } = text;
  const onChange = (e) => {
    const { value, name } = e.target;
    setText({
      ...text,
      [name]: value,
    });
  };
  const onCreate = () => {
    let formData = new FormData();

    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("description", description);

    postfiles?.file.map((eachfile) => {
      formData.append("files", new Blob([eachfile], { type: "image/png" }));
    });

    try {
      axios.put(`http://i5c207.p.ssafy.io/curation/post/${post_id}`, formData, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      });
      // history.push(`/articles/detail/${post_id}`);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Update
        onChange={onChange}
        title={title}
        description={description}
        ingredients={ingredients}
        uploadFile={uploadFile}
        onCreate={onCreate}
        post_id={post_id}
      />
    </div>
  );
}

export default ArticleUpdate;
