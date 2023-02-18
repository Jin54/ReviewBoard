import axios from "axios";

export const MapDataAPI = async (
  showURL,
  indexNum,
  pageSize,
  x,
  y,
  mapBounds,
  setMapData
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
    // console.log(data.data.result);
    setMapData(data.data.result);
  } catch (err) {
    alert(err);
  }
};

export default MapDataAPI;
