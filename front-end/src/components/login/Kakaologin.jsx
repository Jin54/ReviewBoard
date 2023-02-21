import React from 'react';
import {useHistory} from "react-router-dom"
import styled from 'styled-components';

const {Kakao} = window;

const Kakaologin = () => {

    function loginWithKakao() {
        if (!Kakao.isInitialized()) {
            Kakao.init(process.env.Kakao_Client_Id)
        }

        Kakao.Auth.login({
            success: (_) => {
                Kakao.API.request({
                    url: '/v2/user/me',
                    data: {
                        property_keys: ["kakao_account.email", "kakao_account.profile"]
                    },
                    success: (res) => {
                        // res.kakao_account.email
                        // res.kakao_account.profile.nickname
                        // res.kakao_account.profile.profile_image_url
                        console.log( res.kakao_account.email )
                        // util.removeScript(kakaoScript)
                        // return res.kakao_account
                        localStorage.setItem("email",res.kakao_account.email);
                        console.log('이메일은'+ res.kakao_account.email);
                    },
                    fail: (err) => {
                        alert(`개인정보를 가져올 수 없습니다. ${JSON.stringify(err)}`)
                    }
                })
            },
            fail: (err) => {
                alert(`도메인을 확인해주세요. ${JSON.stringify(err)}`)
            },
        });
    }
    

return (
    <LoginBtn onClick={()=>loginWithKakao()}>로그인</LoginBtn>
)
}

const LoginBtn = styled.a`
  border: 1.5px solid #c09567;
  border-radius: 50px;
  padding: 10px 20px;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  color: #c09567;
  /* width: 100px; */
  box-sizing: border-box;
  text-decoration: none;
  margin-left: 20px;
  box-sizing: border-box;
  cursor: pointer;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`

export default Kakaologin;