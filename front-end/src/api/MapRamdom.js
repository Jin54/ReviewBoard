import axios from "axios";
const url = "http://3.35.140.28:9000/app/shop";

const MapRamdom = () => {
  axios.get(url).then((res) => {
    console.log(res.data);
    return res.data;
  });
};

export default MapRamdom;
