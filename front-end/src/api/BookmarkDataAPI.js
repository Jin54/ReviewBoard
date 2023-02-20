import axios from "axios";

const BookmarkDataAPI = async (showURL, token, SetBookmarkData) => {
  const apiurl = process.env.REACT_APP_APIURL;
  const url = `${apiurl}/${showURL}/bookmark/`;
  try {
    const data = await axios({
      method: "get",
      url: url,
      headers: {
        "X-ACCESS-TOKEN": `${token}`,
      },
    });

    // console.log(data.data.result);
    SetBookmarkData(data.data.result);
  } catch (err) {
    alert(err);
  }
};

export default BookmarkDataAPI;
