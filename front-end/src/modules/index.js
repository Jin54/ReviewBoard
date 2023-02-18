import { combineReducers } from "redux";
import saveData from "./saveData";
import setMap from "./setMap";
import urlChange from "./urlChange";
import bookmark from "./bookmark";

const rootReducer = combineReducers({
  saveData,
  setMap,
  urlChange,
  bookmark,
});

export default rootReducer;
