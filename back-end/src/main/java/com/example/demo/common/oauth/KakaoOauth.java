


package com.example.demo.common.oauth;


import com.example.demo.common.exceptions.BaseException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import static com.example.demo.common.response.BaseResponseStatus.FAILED_KAKAO_FIND_FAILED;
import static com.example.demo.common.response.BaseResponseStatus.FAILED_KAKAO_LOGIN;

@Slf4j
@Component
@RequiredArgsConstructor
public class KakaoOauth implements SocialOauth {

//    @Value("${spring.oauth2.client.provider.kakao.authorization-uri}")
    private String KAKAO_SNS_BASE_URL = "https://kauth.kakao.com/oauth/authorize";
    @Value("${spring.oauth2.client.registration.kakao.client-id}")
    private String KAKAO_SNS_CLIENT_ID;
    @Value("${spring.oauth2.client.registration.kakao.redirect-uri}")
    private String KAKAO_SNS_CALLBACK_URL;

    @Value("${spring.oauth2.client.provider.kakao.token-uri}")
    private String KAKAO_SNS_TOKEN_BASE_URL;
//
    @Value("${spring.oauth2.client.provider.kakao.user-info-uri}")
    private String KAKAO_SNS_PROFILE_BASE_URL;

    @Override
    public String getOauthRedirectURL() {
        Map<String, Object> params = new HashMap<>();
        //    params.put("scope", "profile");
        params.put("response_type", "code");
        params.put("client_id", KAKAO_SNS_CLIENT_ID);
        params.put("redirect_uri", KAKAO_SNS_CALLBACK_URL);

        String parameterString = params.entrySet().stream()
                .map(x -> x.getKey() + "=" + x.getValue())
                .collect(Collectors.joining("&"));

        return KAKAO_SNS_BASE_URL + "?" + parameterString;

    }

    @Override
    public String requestAccessToken(String code) {

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        // Set parameter
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", KAKAO_SNS_CLIENT_ID);
        params.add("redirect_uri",KAKAO_SNS_CALLBACK_URL);
        params.add("code", code);
        // Set http entity
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        try {
            String tokenUrl = KAKAO_SNS_TOKEN_BASE_URL;
            ResponseEntity<String> response = restTemplate.postForEntity(tokenUrl, request, String.class);

//            System.out.println("\n>>>> getKakaoAccessToken");
//            System.out.println(response.getBody());
//            System.out.println("\n");

            if (response.getStatusCode() == HttpStatus.OK) {
                String str = response.getBody();
                ObjectMapper mapper = new ObjectMapper();
                Map<String, Object> map = mapper.readValue(str, Map.class);
                Object obj = map.get("access_token");
                String resString = String.valueOf(obj);
                System.out.println("\naccessToken");
                System.out.println(resString);
                //카카오에서 개인정보 가져오기 (이름 이멜)
//                getProfile(resString);

                return resString;

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "카카오 로그인 요청 처리 실패";
    }

    public String[] getProfile(String accessToken) {
        //access_token을 이용하여 사용자 정보 조회
        try {
            URL url = new URL(KAKAO_SNS_PROFILE_BASE_URL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + accessToken); //전송할 header 작성, access_token전송

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            if(responseCode != 200){
                throw new BaseException(FAILED_KAKAO_FIND_FAILED);
            }
            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            //Gson 라이브러리로 JSON파싱
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);


            String info[] =new String[2];
            info[0] = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("email").getAsString();

            info[1]  =element.getAsJsonObject().get("properties").getAsJsonObject().get("nickname").getAsString();

            br.close();

            return  info;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return  null;
    }

}
