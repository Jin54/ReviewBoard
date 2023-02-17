import axios from "axios";

export const CenterRestaurantAPI = async (
  setData,
  x,
  y,
  showURL,
  indexNum,
  pageSize,
  mapBounds
) => {
  const apiurl = process.env.REACT_APP_APIURL;
  const url = `${apiurl}/${showURL}/coord?pageIndex=${indexNum}&pageSize=${pageSize}&lat=${x}&lon=${y}&distance=${mapBounds}`;

  try {
    const data = await axios({
      method: "get",
      url: url,
    });
    // console.log(data.data.result);
    setData(data.data.result);
  } catch (err) {
    alert(err);
  }
};

export default CenterRestaurantAPI;
