import axios from "axios";

const url = "http://3.35.140.28:9000/shop/random";

export const MapRamdomAPI = async (setRamdomData) => {
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
