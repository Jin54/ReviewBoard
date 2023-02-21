import axios from "axios";

export const ModalAPI = async (showURL, id, setDetialData) => {
  const apiurl = process.env.REACT_APP_APIURL;
  const url = `${apiurl}/${showURL}/${id}`;
  // console.log("id : " + id);

  try {
    const data = await axios({
      method: "get",
      url: url,
    });
    // console.log(data.data);
    setDetialData(data.data.result);
  } catch (err) {
    alert("해당 매장 정보가 존재하지 않습니다.");
  }
};

export default ModalAPI;
