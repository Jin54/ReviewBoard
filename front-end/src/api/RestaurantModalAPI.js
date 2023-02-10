import axios from "axios";

const url = "http://3.35.140.28:9000/shop";

export const RestaurantModalAPI = async (setListData, id) => {
  try {
    const data = await axios({
      method: "get",
      url: url,
    });
    setListData(data.data.result[id - 1]);
  } catch (err) {
    alert(err);
  }
};

export default RestaurantModalAPI;
