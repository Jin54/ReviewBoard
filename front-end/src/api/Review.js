import axios from "axios";

export const ReviewAPI = async (setReviewData, restaurantID, pageNum) => {
  const url = `http://3.35.140.28:9000/shop/${restaurantID}/review?pageIndex=1&pageSize=${pageNum}`;

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
