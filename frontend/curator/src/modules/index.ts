import { combineReducers } from "redux";
import clientLogin from "./clientLogin";

const rootReducer = combineReducers({ clientLogin });

export default rootReducer;

// 타입도 빼줘야한다.
export type RootState = ReturnType<typeof rootReducer>;
