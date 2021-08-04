import React, { useState } from "react";
import axios from "axios";
import Create from "../page/Create";

function ArticleCreate({ history }) {
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
    title: "",
    description: "",
    ingredients: "",
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
      axios
        .post("http://localhost:9000/curation/post/list", formData, {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        })
        .then((res) => {
          console.log(res);
          const response = axios
            .get("http://localhost:9000/curation/post/list")
            .then((res) => {
              console.log(res.data);
              let post_id = res.data[res.data.length - 1].id;

              history.push(`/articles/${post_id}`);
            });
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Create
        onChange={onChange}
        title={title}
        description={description}
        ingredients={ingredients}
        uploadFile={uploadFile}
        onCreate={onCreate}
      />
    </>
  );
}

export default ArticleCreate;
