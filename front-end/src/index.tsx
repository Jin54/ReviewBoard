import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import rootReducer from "./modules";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const store = createStore(rootReducer, composeWithDevTools());

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
