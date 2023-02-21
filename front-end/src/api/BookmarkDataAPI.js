import axios from "axios";

// 즐겨찾기 해둔 데이터들

const BookmarkDataAPI = async (
  showURL,
  token,
  SetBookmarkData,
  AddBookmarkID
) => {
  const apiurl = process.env.REACT_APP_APIURL;
  const url = `${apiurl}/${showURL}/bookmark/`;
  try {
    const data = await axios({
      method: "get", // 요청 받아오기
      url: url,
      headers: {
        "X-ACCESS-TOKEN": `${token}`,
      },
    });

    // console.log(data.data.result);
    SetBookmarkData(data.data.result);
    data.data.result.map((data) => {
      AddBookmarkID(data.id);
    });
  } catch (err) {
    alert(err);
  }
};

export default BookmarkDataAPI;
