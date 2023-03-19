import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import Marker from "../../../../img/marker.png";
import CircleMarker from "../../../../img/circle.png";
import { setDetailID } from "../../../../modules/saveData";
import { setOpenDetailModal } from "../../../../modules/openBool";

import Overlay from "./Overlay";

const { kakao } = window;

const ShowMarker = () => {
  const _map = useSelector((state) => state.setMap._map);
  const openBookmark = useSelector((state) => state.openBool.bookmark);
  const bookmarkID = useSelector((state) => state.bookmarkID);
  const mapData = useSelector((state) => state.saveData.mapData);
  const [resetMarkers, setResetMarkers] = useState([]);

  const dispatch = useDispatch();
  const SetDetailID = useCallback(
    (id) => dispatch(setDetailID(id)),
    [dispatch]
  );
  const SetOpenDetailModal = useCallback(() => {
    dispatch(setOpenDetailModal());
  }, [dispatch]);
  var showOverlay = null;

  useEffect(() => {
    if (_map === null || mapData == null) return;

    var imageSize = null;
    var markerImage = null;
    var marker = null;
    var zIndex = null;
    var markers = [];
    showOverlay = null;

    if (resetMarkers !== null) {
      for (var i = 0; i < resetMarkers.length; i++) {
        resetMarkers[i].setMap(null);
      }
    }

    mapData.map((data, index) => {
      const coords = new kakao.maps.LatLng(data.lat, data.lon);

      if (openBookmark && bookmarkID[0].includes(data.id)) {
        imageSize = new kakao.maps.Size(30, 42);
        markerImage = new kakao.maps.MarkerImage(
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
          imageSize
        );
        zIndex = -20;
      } else if (index < 11) {
        imageSize = new kakao.maps.Size(35, 35);
        markerImage = new kakao.maps.MarkerImage(Marker, imageSize);
        zIndex = -30;
      } else {
        imageSize = new kakao.maps.Size(25, 25);
        markerImage = new kakao.maps.MarkerImage(CircleMarker, imageSize);
        zIndex = -40;
      }

      marker = new kakao.maps.Marker({
        map: _map,
        position: coords,
        image: markerImage,
      });

      marker.setZIndex(zIndex);
      markers.push(marker);

      //contents 까지 마커 클릭 시 오버레이 생성할 때 선언하면 이미지를 보여주는데 딜레이가 된다.
      var contents = Overlay(
        data,
        (id) => {
          SetDetailID(id);
        },
        () => {
          SetOpenDetailModal();
        }
      );

      // 마커를 클릭했을 때 커스텀 오버레이를 선언&표시합니다
      kakao.maps.event.addListener(marker, "click", function () {
        if (showOverlay !== null) showOverlay.setMap(null);

        showOverlay = new kakao.maps.CustomOverlay({
          clickable: true, //true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          content: contents,
          position: marker.getPosition(),
        });

        showOverlay.setMap(_map);

        //닫기 버튼 클릭 시 오버레이 닫기
        contents.getElementsByClassName("closeimgWrap")[0].onclick = () => {
          showOverlay.setMap(null);
        };
        //지도를 클릭했을 때 오버레이 닫기
        kakao.maps.event.addListener(_map, "click", function () {
          showOverlay.setMap(null);
        });
        //오버레이 클릭했을 때 오버레이 닫기 (모달창 열릴 때 오버레이 닫기)
        contents.onclick = () => {
          showOverlay.setMap(null);
        };
      });
    });

    setResetMarkers(markers);
  }, [mapData, openBookmark]);
};

export default ShowMarker;
