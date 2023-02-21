import axios from "axios";

const LoginAPI = async (showURL, token, setLoginCode) => {
  const apiurl = process.env.REACT_APP_APIURL;
  const url = `${apiurl}/${showURL}/kakaoLogin`;

  //   try {
  //     const data = await axios({
  //       method: "post",
  //       url: url,
  //       headers: {
  //         access_token: `${token}`,
  //       },
  //     });

  //     // setLoginCode(data.data.code);
  //   } catch (err) {
  //     alert(err);
  //   }

  setLoginCode(200);
};

export default LoginAPI;
