//마커 보여주기
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import Marker from "../../../../img/marker.png";
import CircleMarker from "../../../../img/circle.png";
import { setDetailID } from "../../../../modules/saveData";
import { setOpenDetailModal } from "../../../../modules/openBool";

import Overlay from "./Overlay";

const { kakao } = window;

const ShowMarker = (props) => {
  const _map = useSelector((state) => state.setMap._map);
  const openBookmark = useSelector((state) => state.openBool.bookmark);
  const bookmarkID = useSelector((state) => state.bookmarkID);
  const dispatch = useDispatch();
  const SetDetailID = useCallback(
    (id) => dispatch(setDetailID(id)),
    [dispatch]
  );
  const SetOpenDetailModal = useCallback(() => {
    dispatch(setOpenDetailModal());
  }, [dispatch]);
  const [markers, setMarkers] = useState([]);
  var showOverlay = null;

  useEffect(() => {
    if (_map === null || props.mapData == null) return;

    if (markers !== null) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      setMarkers([]);
    }

    props.mapData.map((data, index) => {
      const coords = new kakao.maps.LatLng(data.lat, data.lon);

      if (props.show == "bookmark" && openBookmark) {
        var imageSize = new kakao.maps.Size(30, 42);
        var markerImg = new kakao.maps.MarkerImage(
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
          imageSize
        );
        var marker = new kakao.maps.Marker({
          map: _map,
          position: coords,
          image: markerImg,
        });
        marker.setZIndex(-20);
      } //북마크에 있는 데이터일 때
      else if (openBookmark && bookmarkID[0].includes(data.id)) {
        return;
      } else if (index < 10) {
        var imageSize = new kakao.maps.Size(35, 35);
        var markerImage = new kakao.maps.MarkerImage(Marker, imageSize);
        marker = new kakao.maps.Marker({
          map: _map,
          position: coords,
          image: markerImage,
        });
        marker.setZIndex(-30);
      } else {
        var imageSize = new kakao.maps.Size(25, 25);
        var markerImage = new kakao.maps.MarkerImage(CircleMarker, imageSize);
        marker = new kakao.maps.Marker({
          map: _map,
          position: coords,
          image: markerImage,
        });
        marker.setZIndex(-40);
      }

      setMarkers((markers) => [...markers, marker]);

      //contents 까지 마커 클릭 시 오버레이 생성할 때 선언하면 이미지를 보여주는데 딜레이가 된다.
      const contents = Overlay(
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
        //오버레이 클릭했을 때 오버레이 닫기
        contents.onclick = () => {
          showOverlay.setMap(null);
        };
      });
    });
  }, [props.mapData, openBookmark]);
};

export default ShowMarker;
