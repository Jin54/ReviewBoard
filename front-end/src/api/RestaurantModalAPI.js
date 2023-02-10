import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

const url = "http://3.35.140.28:9000/shop";

export const RestaurantModalAPI = async (setListData) => {
  try {
    const data = await axios({
      method: "get",
      url: url,
    });
    setListData(data.data.result);
  } catch (err) {
    alert(err);
  }
};

export default RestaurantModalAPI;
