import axios from "axios";

export const MapDataAPI = async (
  showURL,
  indexNum,
  pageSize,
  x,
  y,
  mapBounds,
  SetMapData
) => {
  // console.log("setMapData : " + setMapData);
  // console.log("x : " + x);
  // console.log("y : " + y);
  // console.log("showURL : " + showURL);
  // console.log("indexNum : " + indexNum);
  // console.log("pageSize : " + pageSize);
  // console.log("mapBounds : " + mapBounds);

  const apiurl = process.env.REACT_APP_APIURL;
  const url = `${apiurl}/${showURL}/coord?pageIndex=${indexNum}&pageSize=${pageSize}&lat=${x}&lon=${y}&distance=${mapBounds}`;

  try {
    const data = await axios({
      method: "get",
      url: url,
    });
    SetMapData(data.data.result);
    // if (data.data.code == 200) {
    //   SetMapData(data.data.result);
    // } else if (data.data.code == 404) {
    //   console.log(data.data);
    // } else {
    //   alert("데이터 요청에 실패하였습니다.");
    // }
  } catch (err) {
    alert("데이터 요청에 실패하였습니다.");
  }
};

export default MapDataAPI;
