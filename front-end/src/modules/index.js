import { combineReducers } from "redux";
import map from "./map";
import restaurantModal from "./restaurantModal";

const rootReducer = combineReducers({
  map,
  restaurantModal,
});

export default rootReducer;
