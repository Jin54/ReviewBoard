import axios from "axios";

export const ListRandom = async (setRandomData, pageNum) => {
  const apiurl = process.env.REACT_APP_APIURL;
  const url = `${apiurl}/shop?pageIndex=1&pageSize=${pageNum}`;

  try {
    const data = await axios({
      method: "get",
      url: url,
    });
    setRandomData(data.data.result);
  } catch (err) {
    alert(err);
  }
};

export default ListRandom;
