//마커 보여주기
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import Marker from "../../../../img/marker.png";
import CircleMarker from "../../../../img/circle.png";
import { setDetailID } from "../../../../modules/saveData";
import { setOpenDetailModal } from "../../../../modules/openBool";

import Overlay from "./Overlay";

const { kakao } = window;

/**
 * FIXME - 엘레멘트를 리턴하는 컴포넌트가 아닌 것 같아요.
 *   CreateMap.jsx에 작성해드린 주석처럼 custom hook으로 만들어서 처리해주세요.
 */
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
  /*
   * FIXME - 블록 레벨 스코프 변수를 사용해주세요.
   *  const showOverlay = null;
   *  혹은 글로벌하게 사용되어야한다면 ref를 이용해서 overlay 엘레먼트를 핸들링하는 것도 방법일 것 같아요.
   */
  var showOverlay = null;

  useEffect(() => {
    if (_map === null || props.mapData == null) return;

    if (markers !== null) {
      /*
       * FIXME - forEach로 처리하면 어떨까요
       *  markers.forEach(marker => {
       *    marker.setMap(null);
       *  })
       *  setMarkers([])
       */
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      setMarkers([]);
    }

    props.mapData.map((data, index) => {
      const coords = new kakao.maps.LatLng(data.lat, data.lon);

      /*
       * FIXME - === 엄격한 비교 연산자를 사용해주세요.
       *  else if 사용을 지양해주세요
       *  else if를 최대한 사용하지 않도록 구현하거나 다른 if문으로 분리해주세요.
       */
      if (props.show == "bookmark" && openBookmark) {
        /*
         * FIXME - 블록 레벨 스코프를 가지는 let, const를 사용해주세요.
         */
        var imageSize = new kakao.maps.Size(30, 42);
        /*
         * FIXME - 블록 레벨 스코프를 가지는 let, const를 사용해주세요.
         */
        var markerImg = new kakao.maps.MarkerImage(
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
          imageSize
        );
        /*
         * FIXME - 블록 레벨 스코프를 가지는 let, const를 사용해주세요.
         */
        var marker = new kakao.maps.Marker({
          map: _map,
          position: coords,
          image: markerImg,
        });
        marker.setZIndex(-20);
      } //북마크에 있는 데이터일 때
      /*
       * FIXME - if문을 분리하고 조건이 어떤 조건인지 의미하는 변수로 분리하면 좋을 것 같아요.
       *  const isOpenBookMark = openBookmark && bookmarkID[0].includes(data.id);
       *  if(isOpenBookMark) {
       *   // ...
       *  }
       */
      else if (openBookmark && bookmarkID[0].includes(data.id)) {
        return;
      }
      /*
       * FIXME - index가 10 미만이 어떤 의미인지 변수로 만들어서 조건문에 사용하면 좋을 것 같아요.
       */
      else if (index < 10) {
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
        //오버레이 클릭했을 때 오버레이 닫기 (모달창 열릴 때 오버레이 닫기)
        contents.onclick = () => {
          showOverlay.setMap(null);
        };
      });
    });
  }, [props.mapData, openBookmark]);
};

export default ShowMarker;
