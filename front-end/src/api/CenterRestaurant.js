import axios from "axios";

export const CenterRestaurantAPI = async (setCenterData, x, y) => {
  const url = `http://3.35.140.28:9000/shop/coord?pageIndex=1&pageSize=20&lat=${x}&lon=${y}`;

  try {
    const data = await axios({
      method: "get",
      url: url,
    });
    setCenterData(data.data.result);
  } catch (err) {
    alert(err);
  }
};

export default CenterRestaurantAPI;
