import { combineReducers } from "redux";
import { articleReducers } from "./articleSlice";
import { boardReducers } from "./boardSlice";
import { commentReducers } from "./commentSlice";
const rootReducer = combineReducers({
  articleReducers,
  boardReducers,
  commentReducers,
});

export default rootReducer;
