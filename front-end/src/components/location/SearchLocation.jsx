//지역 검색시, 해당 지역의 음식점만 조회
import { useSelector } from "react-redux";
import { useEffect } from "react";

import SearchLocationAPI from "../../api/SearchLocationAPI";

const SearchLocation = (props) => {
  const showURL = useSelector((state) => state.urlChange.name);

  useEffect(() => {
    if (props.smallLocation === null) return;

    SearchLocationAPI(
      props.bigLocation,
      props.smallLocation,
      (data) => {
        props.setMapData(data);
      },
      100,
      showURL
    );
  }, [props.smallLocation]);
};

export default SearchLocation;
