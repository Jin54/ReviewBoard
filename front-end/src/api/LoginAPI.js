import axios from "axios";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setKakaoToken } from "../modules/token";

const LoginAPI = async ( kakaoToken, SetKakaoToken ) => {
  const apiurl = process.env.REACT_APP_APIURL;
  const url = `${apiurl}kakaoLogin`;

  const token = {access_token : kakaoToken}

    try {
      const data = await axios({
        method: "post",
        url: url,
        data: token,
      }); 
      console.log(kakaoToken)
      console.log(url)
      //  데이터 받아오는 함수 작성
      console.log(data)
      SetKakaoToken(data.result)

  //     // setLoginCode(data.data.code);
    } catch (err) {
      alert(err);
    }

  // setLoginCode(200);
};

export default LoginAPI;
