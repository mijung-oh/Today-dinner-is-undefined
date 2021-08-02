import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import clientLogin from "./clientLogin";
// import clientLogin from "./clientLogin2";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["clientLogin"], // required인지 모르겠당..
};

export const rootReducer = combineReducers({ clientLogin: clientLogin });

// 타입도 빼줘야한다. <-- 이거 export 해야지 나중에 useSelector 사용할 때 state의 Type을 지정할 수 있다
export type RootState = ReturnType<typeof rootReducer>;

// //persistReducer에 감싸서 보낸다

// export default persistReducer(persistConfig, rootReducer);
// 정상 코드
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  const store = createStore(persistedReducer, composeWithDevTools());
  const persistor = persistStore(store);
  return { store, persistor };
}
