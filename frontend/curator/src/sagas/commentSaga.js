import Axios from "axios";
import { put } from "redux-saga/effects";
import { commentActions } from "../slice/commentSlice";
import history from "../utils/history";

export function* registerCommentAsync(action) {
  const data = action.payload;

  yield Axios.post(`http://localhost:4000/comment/`, data);
  history.go(0);
}

export function* getCommentsAsync(action) {
  const articleId = action.payload;
  const response = yield Axios.get(
    `http://localhost:4000/comment?articleId=${articleId}`
  );
  yield put(commentActions.getCommentsAsync(response.data));
}

export function* deleteCommentAsync(action) {
  const commentId = action.payload;
  yield Axios.delete(`http://localhost:4000/comment/${commentId}`);
  history.go(0);
}
