import axios from "axios";

export const SearchRestaurantAPI = async (
  bigLocation,
  smallLocation,
  setRestuarantData,
  pageNum
) => {
  const apiurl = process.env.REACT_APP_APIURL;
  const url = `${apiurl}/shop/address?pageIndex=1&pageSize=${pageNum}&first=${bigLocation}&second=${smallLocation}`;

  try {
    const data = await axios({
      method: "get",
      url: url,
    });
    setRestuarantData(data.data.result);
  } catch (err) {
    alert(err);
  }
};

export default SearchRestaurantAPI;
