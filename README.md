# ReviewBoard

엘핀 모든 리뷰

## About ReviewBoard

SK Planet에서 진행한 ASAC 프로그램 기간 중 기업 프로젝트에 참여해서 제작한 웹사이트입니다.
‘엘핀’ 에서 제공한 기획을 바탕으로 UI를 수정하고 React로 구현했습니다.
프론트앤드 2명, 백앤드 1명으로 구성되었습니다.

## 사용 기능

- Redux
- React Hooks ( useState, useEffect )
- styled-components
- react-intersection-observer
- AXIOS
- SCSS
- 반응형
- Kakao Map 
- KakaoTalk API

### 제작 기간

2023-02-01 ~ 2023-03-02

### 도메인 링크

https://joyful-buttercream-e0df61.netlify.app/

### 스웨거 링크

https://allreview.shop:9000/swagger-ui/index.html

## 전체 구조
### 1. 지도 구조
![image](https://user-images.githubusercontent.com/114986489/222860862-edf67e2a-c8ab-476a-a77c-b9506311f199.png)
![image](https://user-images.githubusercontent.com/114986489/222863820-5e20ed2b-2833-4b88-b0fb-cb896f965b28.png)

### 2. 지도 마커 표시 및 리스트 보기
지도에서 보여주는 데이터 (지도의 중심좌표/레벨이 변경됐을 시, 변하는 화면)
![image](https://user-images.githubusercontent.com/114986489/222863868-cde5fcea-4b6a-470f-bb01-83f94caef5c8.png)

### 3. 상세 모달창
오버레이, 리스트 보기의 컴포넌트 클릭 시 보여주는 상세 모달창
![image](https://user-images.githubusercontent.com/114986489/222863921-195f75d4-f803-44f8-b866-2bc985a9d1a3.png)

### 4. 로그인 및 북마커
카카오 로그인 성공 시, 즐겨찾기 데이터 보여주기
![image](https://user-images.githubusercontent.com/114986489/222863948-53c7c8c2-4b40-47ba-bc1f-3e7cb5069259.png)

### 5. 하트 클릭 시 북마커 정보 변경
로그인일 때, 하트 클릭 시, 북마크 정보 변경 및 지도&리스트보기&하트에 바로 적용
![image](https://user-images.githubusercontent.com/114986489/222863964-eb0d09a9-20f4-4c0a-8652-976f5e193337.png)

### 6. 맛집/병원 변경
맛집/병원으로 변경됐을 때 데이터 다시 요청 후, 적용
![image](https://user-images.githubusercontent.com/114986489/222864013-c75f17fc-541e-4255-9ce1-a40f0e2465ac.png)


## 기능 리스트

### 1. PC ver.

- 헤더 : </br>
	· 리뷰보드 로고 클릭 시 전체 리렌더링 ( 메인으로 이동 )
	· 로그인 클릭 시 카카오 소셜 로그인창으로 이동 -> 로그인 성공시 사용자 이름 표시 -> 버튼 ‘로그아웃’으로 변경 -> 로그아웃 시 사용자 이름 비활성화 ( 세션 스토리지를 사용해 브라우저가 닫히면 자동 로그인 불가능 )
	· 로그인 후 즐겨찾기 버튼 클릭 시 지도에 즐겨찾기 핀 추가 & 리스트 보기가 북마크 리스트로 변경 ( 로그인 이전에 즐겨찾기 누를 시 로그인 요청 알림 )
	· 맛집 & 병원 클릭 시 해당 정보 받아와서 변경
	· 문의하기 클릭 시 메일 연결 프로그램으로 이동 (‘엘핀’이메일 자동 입력 )
	· ABOUT 우측 화살표 클릭 시 ‘엘핀’정보 표출
- 지도 : 
	· 붉은 마커 : 사용자 현재 위치 표시
	· 초록 마커 : 지도에서 보여 지는 반경 이내의 리뷰가 많은 상위 10개 음식점/병원 표시 (별점 3.0 이상)
	· 원형 마커 : 지도에서 보여지는 반경 이내의 리뷰가 많은 상위 10위~90위 음식점/병원 표시	· 오버레이 : 마커 클릭 시, 해당 마커의 정보를 보여주는 작은 창(오버레이)가 		보여 지고, 오버레이 클릭 시 상세 모달 창으로 이동. 다른 마커 클릭 시, 오버레이 창 변경.
	· 중심 좌표, 지도 확대 레벨이 바뀔 때마다 좌표 중심으로 음식점/병원 API 호출
- 지도 버튼 : 
	· 지역 선택 버튼 클릭 시 상위 지역 선택 가능 -> 상위 지역에 해당하는 하위 지역 선택 가 -> 해당 위치로 지도 이동
	· 현재 위치 버튼 클릭 시 사용자 현재 위치로 이동 ( 위치 정보 미동의 시 알림창 활성화 )
	· 지도보기 & 리스트보기 버튼 클릭 시 해당 페이지 표출
- 리스트 : 
	· 지역 미선택 후 리스트 보기 클릭 시 
	· 지역 선택 후 리스트 보기 클릭 시 해당 지역의 매장만 표시
	· 20개 기준 무한 스크롤
	· 매장 이미지 없을 시 ‘No IMG’ 이미지 표시
	· 지도에 표시되는 마커 (맛집/병원)을 리뷰순으로 표시
- 상세 모달 : 
	· 모달 이외 구역 클릭 시 모달 닫힘
	· 영업 시간이 다양한 경우 토글 버튼을 사용해서 열고 닫기
	· 영업 시간 & 업종 & 번호 없을 시 ‘정보가 존재하지 않습니다’표시
	· 정보 변경 요청시 해당 매장 ID 복사
	· 즐겨찾기 가능
	· 리뷰 내용 클릭 시 더보기 가능
	· 리뷰 별점에 따라 ‘정말 맛있어요’‘괜찮아요’등 일관성 있는 감정표현 
	· 리뷰 별점 수치에 따라 별 채워지는 정도 상이 
	· 별점을 주지 않았을 경우 ‘별점을 주지 않았습니다’표시

### 2. Tablet ver.

- 1000px을 기준으로 모바일 UI와 동일하게 변경

### 3. Mobile ver.

- 헤더 : 
	· PC 버전의 헤더 메뉴들 햄버거 바 클릭 시 표출 -> 햄버거 버튼 OR 배경 클릭 시 닫힘
- 지도 : 
	· PC 버전과 동일
- 지도 버튼 : 
	· 모바일에서 엑스 버튼을 누르기 어려울 수 있는 점을 반영해 배경 클릭 시 모달 창 닫힘 추가
- 리스트 : 
	· 작은 모바일 화면을 고려해 매장 한 개 UI 변경
- 상세 모달 : 
	· 정보 변경 & 즐겨찾기 위치 수정
	· 별점 크기 반응형 조절


<img width="80%" src="https://user-images.githubusercontent.com/73871543/222392417-c206eb71-9138-4fd2-89c4-261997fade00.png"/>
