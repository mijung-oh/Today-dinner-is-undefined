import React from "react";
import { Button, Typography } from "antd";
import { Link } from "react-router-dom";
const { Title } = Typography;
function ArticleDetail(props) {
  return (
    <div>
      <div style={{ margin: "2rem auto" }}>
        <a href="/">
          <Button
            style={{
              backgroundColor: "indigo",
              color: "white",
              borderRadius: "10px 100px / 120px",
            }}
          >
            목록으로 가기
          </Button>
        </a>
      </div>
      <div style={{ textAlign: "center" }}>
        <Title>게시글</Title>
      </div>
      <div>
        <table>
          <colgroup>
            <col width="10%" /> <col width="40%" /> <col width="10%" />
            <col width="40%" />
          </colgroup>
          <tr>
            <th>번호</th> <td>{props.id}</td> <th>조회수</th>
            <td>{props.views}</td>
          </tr>
          <tr>
            <th>제목</th> <td colSpan="3">{props.title}</td>
          </tr>
          <tr>
            <th>내용</th> <td colSpan="3">{props.content}</td>
          </tr>
          <tr>
            <th>날짜</th>
            <td colSpan="3">{new Date(props.date).toLocaleString()}</td>
          </tr>
        </table>
        <br />
        <div>
          {props.loadComments.length > 0 &&
            props.loadComments.map((comment) => (
              <div
                style={{
                  width: "70%",

                  border: "1px dotted black",
                }}
              >
                <span key={comment.id}>
                  <span>{comment.content}</span>
                  <span style={{ float: "right" }}>
                    {new Date(comment.date).toLocaleString()}&nbsp;
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => props.deleteComment(comment.id)}
                    >
                      [X]
                    </span>
                  </span>
                </span>
              </div>
            ))}
        </div>
      </div>
      <div style={{ margin: "2rem auto" }}>
        <Link to={`/edit/${props.id}?isForEdit=true`}>
          <Button
            style={{
              backgroundColor: "skyblue",
              color: "white",
              borderRadius: "10px 100px / 120px",
            }}
          >
            수정
          </Button>
        </Link>

        <Button
          style={{
            backgroundColor: "salmon",
            color: "white",
            borderRadius: "10px 100px / 120px",
          }}
          onClick={props.handleDeleteClick}
        >
          삭제
        </Button>
      </div>
      <div style={{ margin: "auto" }}>
        <div
          style={{
            margin: "2rem auto",
            width: "400px",
          }}
        >
          {props.handleComment}
        </div>
      </div>
    </div>
  );
}
export default ArticleDetail;
