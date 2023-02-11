import axios from "axios";

export const ListRandom = async (setRandomData, pageNum) => {
  const url = `http://3.35.140.28:9000/shop?pageIndex=1&pageSize=${pageNum}`;

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
