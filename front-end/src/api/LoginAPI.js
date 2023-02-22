import axios from "axios";

const LoginAPI = async (kakaoToken, setBookmarkAPI) => {
  const apiurl = process.env.REACT_APP_APIURL;
  const url = `${apiurl}kakaoLogin`;
  const token = { access_token: kakaoToken };

  try {
    const data = await axios({
      method: "post",
      url: url,
      data: token,
    });

    sessionStorage.setItem("user-jwt", data.data.result.jwt);
    sessionStorage.setItem("user-name", data.data.result.name);
    sessionStorage.setItem("user-email", data.data.result.email);
    setBookmarkAPI(true);
  } catch (err) {
    alert(err);
  }
};

export default LoginAPI;
