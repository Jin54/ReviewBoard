import axios from "axios";

export const ReviewAPI = async (showURL, id, pageNum, setReviewData) => {
  const apiurl = process.env.REACT_APP_APIURL;
  const url = `${apiurl}/${showURL}/${id}/review?pageIndex=1&pageSize=${pageNum}`;

  // console.log("id : " + id);
  // console.log("pageNum : " + pageNum);

  try {
    const data = await axios({
      method: "get",
      url: url,
    });
    // console.log(data.data);
    setReviewData(data.data.result);
  } catch (err) {
    alert(err);
  }
};

export default ReviewAPI;
