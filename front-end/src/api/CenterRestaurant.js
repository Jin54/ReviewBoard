import axios from "axios";

export const CenterRestaurantAPI = async (
  setData,
  x,
  y,
  showURL,
  indexNum,
  pageSize,
  mapBounds
) => {
  const apiurl = process.env.REACT_APP_APIURL;
  const url = `${apiurl}/${showURL}/coord?pageIndex=${indexNum}&pageSize=${pageSize}&lat=${x}&lon=${y}&distance=${mapBounds}`; //좌표 탐색
  // const url = `${apiurl}/${showURL}/${id}`; //가게 상세 -> 안 쓸 거고
  // const url = `${apiurl}/${showURL}/${restaurantID}/review?pageIndex=1&pageSize=${pageNum}`; //리뷰
  // const url = `${apiurl}/${showURL}/address?pageIndex=1&pageSize=100&first=${bigLocation}&second=${smallLocation}`; //지역 검색

  try {
    const data = await axios({
      method: "get",
      url: url,
    });
    // console.log(data.data.result);
    setData(data.data.result);
  } catch (err) {
    alert(err);
  }
};

export default CenterRestaurantAPI;
