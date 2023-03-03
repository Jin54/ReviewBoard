import axios from "axios";

export const ReviewAPI = async (showURL, id, pageNum, setReviewData) => {
  const apiurl = process.env.REACT_APP_APIURL;
  const url = `${apiurl}/${showURL}/${id}/review?pageIndex=1&pageSize=${pageNum}`;

  try {
    const data = await axios({
      method: "get",
      url: url,
    });
    setReviewData(data.data.result);
  } catch (err) {
    alert("해당 가게의 리뷰 정보를 가져오지 못했습니다.");
  }
};

export default ReviewAPI;
