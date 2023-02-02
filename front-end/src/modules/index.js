import { combineReducers } from "redux";
import map from "./map";
import restaurantModal from "./restaurantModal";
import location from "./location";

const rootReducer = combineReducers({
  map,
  restaurantModal,
  location,
});

export default rootReducer;
