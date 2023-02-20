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
    alert(err);
  }
};

export default ModalAPI;
