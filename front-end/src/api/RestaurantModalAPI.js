import axios from "axios";

export const RestaurantModalAPI = async (setListData, id, showURL) => {
  const apiurl = process.env.REACT_APP_APIURL;
  const url = `${apiurl}/${showURL}/${id}`;

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
