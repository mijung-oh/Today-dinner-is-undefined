import axios from "axios";
import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import BorderColorRoundedIcon from "@material-ui/icons/BorderColorRounded";
import IconButton from "@material-ui/core/IconButton";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function CommentList({ post_id }) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const classes = useStyles();
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
  const onCreate = () => {
    let formData = new FormData();

    formData.append("nickname", nickname);
    formData.append("content", content);
    formData.append("postId", postId);

    try {
      axios.post(
        `http://i5c207.p.ssafy.io/curation/post/${post_id}/commentList`,
        formData,
        {
          headers: {
            "Content-Type": `application/json`,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
    setText("");
    const fetchArticle = async () => {
      try {
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
    window.scrollTo = window.scrollY;
  };

  return (
    <div>
      {article.comment.map((content, index) => (
        <div key={index} style={{ display: "flex" }}>
          <Avatar aria-label="recipe">
            <img src={article.profileImage} style={{ width: "100%" }} />
          </Avatar>
          <p key={content.id}>
            {content.content}
            <a href={`/articles/detail/${post_id}`}>
              <button onClick={() => onDelete(content.id)}>삭제임시</button>
            </a>
          </p>
        </div>
      ))}
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          value={content}
          onChange={onChange}
          name="content"
          id="standard-basic"
          label="칭찬과 격려의 댓글:)"
          InputProps={{
            endAdornment: (
              <IconButton onClick={onCreate}>
                <BorderColorRoundedIcon />
              </IconButton>
            ),
          }}
        />
      </form>
    </div>
  );
}

export default CommentList;
