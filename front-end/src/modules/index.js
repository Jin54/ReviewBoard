import { combineReducers } from "redux";
import mapSize from "./mapSize";
import restaurantModal from "./restaurantModal";

const rootReducer = combineReducers({
  mapSize,
  restaurantModal,
});

export default rootReducer;
