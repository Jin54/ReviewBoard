import axios from "axios";

export const MapRamdomAPI = async (setRamdomData, showURL) => {
  const apiurl = process.env.REACT_APP_APIURL;
  const url = `${apiurl}/${showURL}/random`;

  try {
    const data = await axios({
      method: "get",
      url: url,
    });
    setRamdomData(data.data.result);
  } catch (err) {
    alert(err);
  }
};

export default MapRamdomAPI;
