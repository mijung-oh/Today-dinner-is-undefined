import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import TestCompo from "@components/TestCompo";
import configureStore from "./modules/index";
// import { composeWithDevTools } from "redux-devtools-extension";

// import rootReducer from "./modules/index";
// // 테스트 코드
// import { createStore } from "redux";
// import { persistStore } from "redux-persist";

// const store = createStore(rootReducer, composeWithDevTools());
// const persistor = persistStore(store);
// //여기서도 export를 해줬어야한다. --> 그냥 export store는 해결이 안된다.

const { store, persistor } = configureStore();
const Root = () => (
  <Provider store={store}>
    <PersistGate loading={<TestCompo />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
