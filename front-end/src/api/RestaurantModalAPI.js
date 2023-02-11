import axios from "axios";

export const RestaurantModalAPI = async (setListData, id) => {
  const url = `http://3.35.140.28:9000/shop/${id}`;

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
