import { combineReducers } from "redux";
import map from "./map";
import restaurantModal from "./restaurantModal";
import location from "./location";
import urlChange from "./urlChange";

const rootReducer = combineReducers({
  map,
  restaurantModal,
  location,
  urlChange,
});

export default rootReducer;
