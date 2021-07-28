import React from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "antd";
const { TextArea } = Input;

function RegisterOrEdit(props) {
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <Link to="/Board">
        <Button style={{ borderRadius: "10px 100px / 120px" }}>back</Button>
      </Link>
      <form onSubmit={props.handleSubmit}>
        <br />
        <label>Title:</label>
        <Input
          onChange={props.handleTitleChange}
          value={props.titleValue}
          type="text"
          name="title"
          maxLength="30"
          placeholder="30자이하"
        />
        <hr></hr>
        <div>
          <TextArea
            rows="20"
            onChange={props.handleContentChange}
            value={props.contentValue}
            name="content"
          />
        </div>
        <Button
          style={{
            color: "white",
            backgroundColor: "indigo",
            borderRadius: "10px 100px / 120px",
          }}
          onClick={props.handleSubmit}
        >
          {props.updateRequest ? "수정" : "등록"}{" "}
        </Button>
      </form>
    </div>
  );
}

export default RegisterOrEdit;
