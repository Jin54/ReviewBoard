import axios from "axios";

const LoginAPI = async (
  kakaoToken,
  setBookmarkAPI,
  SetUserName,
  SetUserToken
) => {
  const apiurl = process.env.REACT_APP_APIURL;
  const url = `${apiurl}/kakaoLogin`;
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
    SetUserName(data.data.result.name);
    SetUserToken(data.data.result.jwt);
    setBookmarkAPI(true);
  } catch (err) {
    alert("로그인에 실패하였습니다. 이메일 동의를 해주세요.");
  }
};

export default LoginAPI;
