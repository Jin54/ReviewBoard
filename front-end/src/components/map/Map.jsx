import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../style/map.scss";

import ImgComponent from "../ImageComponent";
import markerImg from "../../img/circle.png";
import { changeSize, currentxy, setbounds } from "../../modules/map";
import { modalopen, change } from "../../modules/restaurantModal";
import SearchRestaurantAPI from "../../api/SearchLocationAPI";

import { CenterRestaurantAPI } from "../../api/CenterRestaurant";
import { saveLocation, selectLocation } from "../../modules/location";
import mapData, { setMapData } from "../../modules/mapData";

const { kakao } = window;

const Map = (props) => {
  const size = useSelector((state) => state.map.number);
  const bigLocation = useSelector((state) => state.location.bigLocation);
  const smallLocation = useSelector((state) => state.location.smallLocation);
  const selectLocationBool = useSelector((state) => state.location.bool);
  const currentX = useSelector((state) => state.map.currentX);
  const currentY = useSelector((state) => state.map.currentY);
  const MapData = useSelector((state) => state.mapData.data);

  const dispatch = useDispatch();
  const ChangeSize = useCallback(
    (number) => dispatch(changeSize(number)),
    [dispatch]
  );
  const showURL = useSelector((state) => state.urlChange.name);
  const mapBounds = useSelector((state) => state.map.radius);
  const setBounds = useCallback(
    (ha, qa, oa, pa, radius) => dispatch(setbounds(ha, qa, oa, pa, radius)),
    [dispatch]
  );
  const modalOpen = useCallback(
    (bool) => dispatch(modalopen(bool)),
    [dispatch]
  );
  const changeID = useCallback((id) => dispatch(change(id)), [dispatch]);
  const SaveLocation = useCallback(
    (bigLocation, smallLocation) =>
      dispatch(saveLocation(bigLocation, smallLocation)),
    [dispatch]
  );
  const SelectLocation = useCallback(
    (bool) => dispatch(selectLocation(bool)),
    [dispatch]
  );
  const SetMapData = useCallback(
    (data) => dispatch(setMapData(data)),
    [dispatch]
  );

  useEffect(() => {
    if (props._map === null) return;
    props._map.setCenter(new kakao.maps.LatLng(currentX, currentY));
  }, [currentX]);

  //============지역 선택 시, 중심 좌표 이동 및 맵 이동=======================================================================
  useEffect(() => {
    if (props._map === null) return;
    if (!selectLocationBool) return;

    var geocoder = new kakao.maps.services.Geocoder();
    const location = bigLocation + " " + smallLocation;
    geocoder.addressSearch(location, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        props._map.setCenter(coords);
        props.setX(result[0].y);
        props.setY(result[0].x);
        ChangeSize(4);
      }
    });
  }, [smallLocation]);

  //현재 위치로 부드럽게 이동시키기
  const panTo = () => {
    // 이동할 위도 경도 위치를 생성합니다
    var moveLatLon = new kakao.maps.LatLng(currentX, currentY);
    //현재 위치 버튼 클릭 시 줌 인
    ChangeSize(4);
    props._map.setLevel(4);

    //지도의 범위 적용하기
    var bounds = props._map.getBounds();
    const haversine = require("haversine");
    const start = {
      latitude: bounds.qa,
      longitude: bounds.ha,
    };
    const end = {
      latitude: bounds.pa,
      longitude: bounds.oa,
    };
    const radiusMath = parseInt(
      haversine(start, end, { unit: "meter" }) / 2000
    );
    setBounds(bounds.ha, bounds.qa, bounds.oa, bounds.pa, radiusMath);

    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    props._map.panTo(moveLatLon);
  };
};

export default Map;
