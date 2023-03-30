import axios from "axios";

export const ModalAPI = async (
  showURL: string,
  id: number,
  setDetialData: Function
) => {
  const apiurl = process.env.REACT_APP_APIURL;
  const url = `${apiurl}/${showURL}/${id}`;

  try {
    const data = await axios({
      method: "get",
      url: url,
    });
    setDetialData(data.data.result);
  } catch (err) {
    alert("해당 매장 정보가 존재하지 않습니다.");
  }
};

export default ModalAPI;
