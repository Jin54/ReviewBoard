import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Marker from "../../../../img/marker.png";
import CircleMarker from "../../../../img/circle.png";

const { kakao } = window;

const ShowMarker = () => {
  const _map = useSelector((state) => state.setMap._map);
  const openBookmark = useSelector((state) => state.openBool.bookmark);
  const bookmarkID = useSelector((state) => state.bookmarkID);
  const mapData = useSelector((state) => state.saveData.mapData);

  // const [resetMarkers, setResetMarkers] = useState([]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (_map === null || mapData == null) return;

    var imageSize = null;
    var markerImage = null;
    var marker = null;
    var zIndex = null;
    // var markers = [];

    // if (resetMarkers !== null) {
    //   for (var i = 0; i < resetMarkers.length; i++) {
    //     resetMarkers[i].setMap(null);
    //   }
    //   setResetMarkers([]);
    // }
    if (markers !== null) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
        // console.log(markers[0]);
        // console.log(markers[99]);
        // if (markers[0] === markers[99]) console.log("Yes");
        // else console.log("No");
      }
      setMarkers([]);
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
      // markers.push(marker);
      console.log("markers 길이");
      console.log(markers.length);
      setMarkers((data2) => [...data2, marker]);
    });

    // setResetMarkers(markers);
  }, [mapData, openBookmark]);
};

export default ShowMarker;
