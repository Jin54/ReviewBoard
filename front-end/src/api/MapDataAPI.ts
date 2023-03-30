import axios from "axios";

export const MapDataAPI = async (
  showURL: string,
  indexNum: number,
  pageSize: number,
  x: number,
  y: number,
  mapBounds: number,
  SetMapData: Function
) => {
  const apiurl = process.env.REACT_APP_APIURL;
  const url = `${apiurl}/${showURL}/coord?pageIndex=${indexNum}&pageSize=${pageSize}&lat=${x}&lon=${y}&distance=${mapBounds}`;

  try {
    const data = await axios({
      method: "get",
      url: url,
    });
    SetMapData(data.data.result);
  } catch (err) {
    alert("데이터 요청에 실패하였습니다.");
  }
};

export default MapDataAPI;
