import { call, put, getContext } from "redux-saga/effects";
import Axios from "axios";
import { articleActions } from "../slice/articleSlice";
import history from "../utils/history";

export function* registerArticleAsync(action) {
  const data = action.payload;

  const response = yield Axios.post(`http://localhost:4000/board/`, data);
  yield alert("저장되었습니다.");

  console.log(response.data.id);

  const history = yield getContext("history");
  history.push(`/article/${response.data.id}`, response.data.id);
}

export function* getArticleAsync(action) {
  const id = action.payload;
  const response = yield Axios.get(`http://localhost:4000/board/${id}`);

  const request = yield Axios.put(`http://localhost:4000/board/${id}`, {
    ...response.data,
    views: parseInt(response.data.views) + 1,
  });

  yield put(articleActions.getArticleAsync(request.data));
}

export function* fetchArticleAsync(action) {
  console.log(action);
  const id = action.payload;
  const response = yield Axios.get(`http://localhost:4000/board/${id}`);
  yield put(articleActions.getArticleAsync(response.data));
}

export function* updateArticleAsync(action) {
  const article = action.payload;
  const response = yield Axios.put(
    `http://localhost:4000/board/${article.id}`,
    article
  );
  alert("저장되었습니다.");
  console.log(response.data.id);
  history.push(`/article/${response.data.id}`, response.data.id);
}

export function* deleteArticleAsync(action) {
  const id = action.payload;
  yield Axios.delete(`http://localhost:4000/board/${id}`);
  alert("게시글이 삭제되었습니다.");
  history.push(`/`);
}
