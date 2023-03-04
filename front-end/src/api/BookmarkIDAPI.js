import axios from "axios";
import BookmarkDataAPI from "./BookmarkDataAPI";

//즐겨찾기 한 매장 데이터

const BookmarkIDAPI = async (
  showURL,
  userJWT,
  shopid,
  ResetBookmarkID,
  SetBookmarkData,
  SetOpenDetailModal
) => {
  const apiurl = process.env.REACT_APP_APIURL;
  const url = `${apiurl}/${showURL}/bookmark/${shopid}`;

  try {
    const data = await axios({
      // await 비동기처리 (데이터가 없을 때 문제여서 중간 시간 때문에)
      method: "post", // 수정하기
      url: url,
      headers: {
        "X-ACCESS-TOKEN": userJWT, // 어떤 걸 수정할지
      },
    });
    //await 가 끝나면 실행
    ResetBookmarkID(data.data.result);
    // console.log(data.data.result);

    BookmarkDataAPI(
      showURL,
      userJWT,
      (data) => SetBookmarkData(data),
      (data) => ResetBookmarkID(data)
    );
    SetOpenDetailModal && SetOpenDetailModal(false); //DetailModal.jsx 에서 하트 클릭 시 모달창 닫기
  } catch (err) {
    alert("즐겨찾기에 실패하였습니다.");
  }
};

export default BookmarkIDAPI;
