import axios from "axios";

// 즐겨찾기 해둔 데이터들

const BookmarkDataAPI = async (
  showURL: string,
  userJWT: string,
  SetBookmarkData: Function,
  ResetBookmarkID: Function
) => {
  const apiurl = process.env.REACT_APP_APIURL;
  const url = `${apiurl}/${showURL}/bookmark/`;
  try {
    const data = await axios({
      method: "get", // 요청 받아오기
      url: url,
      headers: {
        "X-ACCESS-TOKEN": userJWT,
      },
    });

    SetBookmarkData(data.data.result);

    var idList: number[] = [];
    data.data.result.map((data: Data) => {
      idList.push(data.id);
    });
    ResetBookmarkID(idList);
  } catch (err) {
    alert("즐겨찾기에 대한 정보가 존재하지 않습니다.");
  }
};

interface Data {
  id: number;
  info: string;
  lat: string;
  lon: string;
  name: string;
  number: string;
  numberAddress: string;
  review_number: number;
  review_rating: number;
  roadAddress: string;
  sort: string;
  thumbnail: string;
  time: string;
}

export default BookmarkDataAPI;
