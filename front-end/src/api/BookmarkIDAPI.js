import axios from "axios";

const BookmarkIDAPI = async (showURL, token, shopid) => {
  const apiurl = process.env.REACT_APP_APIURL;
  const url = `${apiurl}/${showURL}/bookmark/${shopid}`;

  // console.log("showURL : " + showURL);
  // console.log("token : " + token);
  // console.log("shopid : " + shopid);

  try {
    const data = await axios({
      method: "post",
      url: url,
      headers: {
        "X-ACCESS-TOKEN": `${token}`,
      },
    });

    // console.log(data.data.result);
  } catch (err) {
    alert(err);
  }
};

export default BookmarkIDAPI;
