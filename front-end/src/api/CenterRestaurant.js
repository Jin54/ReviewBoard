import axios from "axios";

export const CenterRestaurantAPI = async (setCenterData, x, y, showURL) => {
  const apiurl = process.env.REACT_APP_APIURL;
  const url = `${apiurl}/${showURL}/coord?pageIndex=1&pageSize=20&lat=${x}&lon=${y}`;

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
