import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { markers } from "../modules/map";

const url = "http://3.35.140.28:9000/shop";

export const ListRandom = async (setRandomData) => {
  try {
    const data = await axios({
      method: "get",
      url: url,
    });
    setRandomData(data.data.result);
  } catch (err) {
    alert(err);
  }
};

export default ListRandom;
