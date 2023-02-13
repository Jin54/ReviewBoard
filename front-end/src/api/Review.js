import axios from "axios";

export const ReviewAPI = async (setReviewData, restaurantID, pageNum) => {
  const apiurl = process.env.REACT_APP_APIURL;
  const url = `${apiurl}/shop/${restaurantID}/review?pageIndex=1&pageSize=${pageNum}`;

  try {
    const data = await axios({
      method: "get",
      url: url,
    });
    setReviewData(data.data.result);
  } catch (err) {
    alert(err);
  }
};

export default ReviewAPI;
