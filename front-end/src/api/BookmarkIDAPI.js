import axios from "axios";

//즐겨찾기 한 매장 데이터

const BookmarkIDAPI = async (showURL, token, shopid) => {
  const apiurl = process.env.REACT_APP_APIURL;
  const url = `${apiurl}/${showURL}/bookmark/${shopid}`;

  // console.log("showURL : " + showURL);
  // console.log("token : " + token);
  // console.log("shopid : " + shopid);

  try {
    const data = await axios({ // await 비동기처리 (데이터가 없을 때 문제여서 중간 시간 때문에) 이거 끝나기 전에 암것도 못하도록
      method: "post", // 수정하기
      url: url,
      headers: {
        "X-ACCESS-TOKEN": `${token}`, // 어떤 걸 수정할지
      },
    });
    //await 가 끝나면 실행
    // console.log(data.data.result);
  } catch (err) {
    alert(err);
  }
};

export default BookmarkIDAPI;
