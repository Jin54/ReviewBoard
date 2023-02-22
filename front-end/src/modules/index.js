import { combineReducers } from "redux";

import saveData from "./saveData";
import setMap from "./setMap";
import urlChange from "./urlChange";
import openBool from "./openBool";
import bookmarkID from "./bookmarkID";

const rootReducer = combineReducers({
  saveData,
  setMap,
  urlChange,
  openBool,
  bookmarkID,
});

export default rootReducer;
