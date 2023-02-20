import { combineReducers } from "redux";
import saveData from "./saveData";
import setMap from "./setMap";
import urlChange from "./urlChange";
import openBool from "./openBool";
import bookmarkID from "./bookmarkID";
import token from "./token";

const rootReducer = combineReducers({
  saveData,
  setMap,
  urlChange,
  openBool,
  token,
  bookmarkID,
});

export default rootReducer;
