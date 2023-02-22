import axios from "axios";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setKakaoToken } from "../modules/token";

const LoginAPI = async ( kakaoToken, SetKakaoToken ) => {

  const apiurl = process.env.REACT_APP_APIURL;
  const url = `${apiurl}kakaoLogin`;

    try {
      const data = await axios({
        method: "post",
        url: url,
        body: JSON.stringify({
          access_token: kakaoToken,
        }),
      }); 
      console.log(kakaoToken)
      console.log(url)
      //  데이터 받아오는 함수 작성
      console.log(data)
      SetKakaoToken(data.result)

      // setLoginCode(data.data.code);
    } catch (err) {
      alert(err);
    }

  // setLoginCode(200);
};

export default LoginAPI;
