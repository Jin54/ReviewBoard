import axios from "axios";

export const SearchRestaurantAPI = async (
  bigLocation,
  smallLocation,
  setRestuarantData,
  pageNum
) => {
  const url = `http://3.35.140.28:9000/shop/address?pageIndex=1&pageSize=${pageNum}&first=${bigLocation}&second=${smallLocation}`;

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
