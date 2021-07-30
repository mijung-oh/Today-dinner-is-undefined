import { call, put } from "redux-saga/effects";
import Axios from "axios";
import { boardActions } from "../slice/boardSlice";

export function* getBoardAsync() {
  const response = yield Axios.get(`http://localhost:4000/board/`);
  yield put(boardActions.getBoardAsync(response.data));
}
