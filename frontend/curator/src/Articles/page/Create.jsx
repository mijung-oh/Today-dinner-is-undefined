import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import SaveIcon from "@material-ui/icons/Save";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  inputbutton: {
    padding: "6px 25px",
    backgroundColor: "#FF6600",
    borderRadius: "4px",
    color: "white",
    cursor: "pointer",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function Create({
  onCreate,
  onChange,
  title,
  description,
  ingredients,
  uploadFile,
}) {
  const classes = useStyles();

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <TextField
          onChange={onChange}
          id="standard-basic"
          label="제목"
          name="title"
          value={title}
          style={{ width: "60%" }}
        />
      </div>
      <div>
        {/* <TextField
          id="filled-basic"
          onChange={onChange}
          label="description"
          value={description}
          name="description"
          style={{ width: "60%", height: "60%" }}
          variant="filled"
        /> */}
        <textarea
          onChange={onChange}
          label="description"
          value={description}
          name="description"
          style={{ width: "60%", height: "300px" }}
          placeholder="레시피 입력"
        />
      </div>
      <div>
        <TextField
          onChange={onChange}
          id="outlined-basic"
          label=""
          value={ingredients}
          name="ingredients"
          style={{ width: "60%" }}
        />
      </div>
      <div style={{ margin: "8px" }}>
        <label
          classes="inputbutton"
          for="upload-file"
          style={{
            padding: "6px 25px",
            backgroundColor: "#FF6600",
            borderRadius: "4px",
            color: "white",
            cursor: "pointer",
            // display: "none",
          }}
        >
          upload
        </label>
        <input
          id="upload-file"
          type="file"
          accept="image/*"
          multiple
          onChange={uploadFile}
          // style={{ display: "none" }}
        />
      </div>

      <button
        style={{
          padding: "6px 25px",
          backgroundColor: "#FF6600",
          borderRadius: "4px",
          color: "white",
          cursor: "pointer",
        }}
        onClick={onCreate}
      >
        등록
      </button>
    </div>
  );
}

export default Create;
