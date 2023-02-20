import { combineReducers } from "redux";
import saveData from "./saveData";
import setMap from "./setMap";
import urlChange from "./urlChange";
import openBool from "./openBool";
import bookmark from "./bookmark";
import token from "./token";

const rootReducer = combineReducers({
  saveData,
  setMap,
  urlChange,
  openBool,
  token,
  bookmark,
});

export default rootReducer;
