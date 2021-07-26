import { combineReducers } from "redux";
import clientLogin from "./clientLogin";

export const rootReducer = combineReducers({ clientLogin: clientLogin });

// 타입도 빼줘야한다.
export type RootState = ReturnType<typeof rootReducer>;
