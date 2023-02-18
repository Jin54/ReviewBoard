//마커 보여주기
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import "../../../../style/map.scss";
import markerImg from "../../../../img/circle.png";
import { setDetailID } from "../../../../modules/saveData";

const { kakao } = window;

const ShowMarker = (props) => {
  const _map = useSelector((state) => state.setMap._map);
  const mapData = useSelector((state) => state.saveData.mapData);
  const [markers, setMarkers] = useState([]);
  const dispatch = useDispatch();
  const SetDetailID = useCallback(
    (id) => dispatch(setDetailID(id)),
    [dispatch]
  );

  useEffect(() => {
    if (_map === null || mapData == null) return;

    if (markers !== null) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      setMarkers([]);
    }

    const showMarkers = mapData.map((data, index) => {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(10, 10);
      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(markerImg, imageSize);
      const coords = new kakao.maps.LatLng(data.lat, data.lon);
      if (index < 10) {
        var marker = new kakao.maps.Marker({
          map: _map, // 마커를 표시할 지도
          position: coords, // 마커를 표시할 위치
        });
      } else {
        marker = new kakao.maps.Marker({
          map: _map, // 마커를 표시할 지도
          position: coords, // 마커를 표시할 위치
          image: markerImage, // 마커 이미지
        });
      }
      setMarkers((markers) => [...markers, marker]);
      marker.setZIndex(-20);

      //=============마커의 오버레이(클릭 시 보여지는 css)========================================================
      var content = document.createElement("div");
      content.className = "wrap";

      var contentHeader = document.createElement("div");
      contentHeader.className = "header";
      content.appendChild(contentHeader);

      var HeaderTitle = document.createElement("p");
      HeaderTitle.innerHTML = data.name;
      contentHeader.appendChild(HeaderTitle);

      var HeaderCloseBtn = document.createElement("div");
      HeaderCloseBtn.className = "closeimgWrap";
      HeaderCloseBtn.innerHTML =
        '<img src="https://i.postimg.cc/ZYjNRKj6/close-white.png"></img>';
      HeaderCloseBtn.onclick = function () {
        overlay.setMap(null);
      };
      contentHeader.appendChild(HeaderCloseBtn);

      var infowrap = document.createElement("div");
      infowrap.className = "infowrap";
      infowrap.innerHTML =
        '<div class="imgwrap">' +
        "<img src='" +
        data.thumbnail +
        "'><img>" +
        "</div>" +
        '<div class="info">' +
        '<p class="address">' +
        data.numberAddress +
        "</p>" +
        '<p class="scope">리뷰 ' +
        data.review_rating +
        "점</p>" +
        '<p class="review"> 리뷰' +
        data.review_number +
        "개</p>" +
        "</div>";
      infowrap.onclick = function () {
        SetDetailID(data.id);
        props.setOpenDetailModal(true);
      };
      content.appendChild(infowrap);

      // 마커 위에 커스텀오버레이를 표시합니다
      // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
      const overlay = new kakao.maps.CustomOverlay({
        clickable: true, //true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
        content: content,
        position: marker.getPosition(),
      });

      // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
      kakao.maps.event.addListener(marker, "click", function () {
        overlay.setMap(_map);
      });
      //지도를 클릭했을 때 오버레이 닫기
      kakao.maps.event.addListener(_map, "click", function () {
        overlay.setMap(null);
      });
    });
  }, [mapData]);
};

export default ShowMarker;
