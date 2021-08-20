import React, { useState } from "react";
import axios from "axios";
import Create from "../page/Create";
function ArticleCreate({ history }) {
  const config = {
    withCredentials: true,
  };
  const prevState = history.location.state;
  const authLogin = async () => {
    const auth = await axios.get(
      "http://i5c207.p.ssafy.io:9000/curation/currentLogin",
      config
    );
    if (auth.data.nickname === "") {
    }
  };
  authLogin();
  const [postfiles, setPostfiles] = useState({
    file: [],
    previewURL: "",
  });
  const [postId, setPostId] = useState([]);
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
    nickname: prevState.nickname,
  });
  const { title, description, ingredients, nickname } = text;
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
    formData.append("nickname", nickname);

    postfiles?.file.map((eachfile) => {
      formData.append("files", new Blob([eachfile], { type: "image/png" }));
    });
    try {
      axios.post(
        "http://i5c207.p.ssafy.io/curation/post/list",
        formData,
        config,

        {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        }
      );
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
        postId={prevState.postId + 1}
      />
    </>
  );
}

export default ArticleCreate;
