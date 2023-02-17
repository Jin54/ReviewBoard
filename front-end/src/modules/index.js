import { combineReducers } from "redux";
import map from "./map";
import restaurantModal from "./restaurantModal";
import location from "./location";
import urlChange from "./urlChange";
import mapData from "./mapData";
import bookmarkFuc from "./bookmark";

const rootReducer = combineReducers({
  map,
  restaurantModal,
  location,
  urlChange,
  mapData,
  bookmarkFuc
});

export default rootReducer;
