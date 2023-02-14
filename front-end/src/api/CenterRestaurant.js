import axios from "axios";

export const CenterRestaurantAPI = async (
  setCenterData,
  x,
  y,
  showURL,
  mapBounds
) => {
  const apiurl = process.env.REACT_APP_APIURL;
  const url = `${apiurl}/${showURL}/coord?pageIndex=1&pageSize=300&lat=${x}&lon=${y}&distance=${mapBounds}`;
  // const url = `${apiurl}/${showURL}/coord?pageIndex=1&pageSize=100&lat=${x}&lon=${y}&distance=100`;
  try {
    const data = await axios({
      method: "get",
      url: url,
    });
    // console.log(data.data.result);
    setCenterData(data.data.result);
  } catch (err) {
    alert(err);
  }
};

export default CenterRestaurantAPI;
