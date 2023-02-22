import { combineReducers } from "redux";

import saveData from "./saveData";
import setMap from "./setMap";
import urlChange from "./urlChange";
import openBool from "./openBool";
import bookmarkID from "./bookmarkID";
import userData from "./userData";

const rootReducer = combineReducers({
  saveData,
  setMap,
  urlChange,
  openBool,
  bookmarkID,
  userData,
});

export default rootReducer;
