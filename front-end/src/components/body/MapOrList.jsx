// 지도보기 & 리스트보기 버튼
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { setOpenListModal } from "../../modules/openBool";

const MapOrList = () => {
  const openListModal = useSelector((state) => state.openBool.listModal);
  const dispatch = useDispatch();
  const SetOpenListModal = useCallback(() => {
    dispatch(setOpenListModal());
  }, [dispatch]);

  return (
    <MapOrListWrap>
      <MapBtn
        onClick={() => {
          SetOpenListModal();
        }}
        selected={!openListModal}
      >
        지도보기
      </MapBtn>
      <ListBtn
        onClick={() => {
          SetOpenListModal();
        }}
        selected={openListModal}
      >
        리스트보기
      </ListBtn>
    </MapOrListWrap>
  );
};

export default MapOrList;

const MapOrListWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60%;
  margin: auto;
  margin-top: 40px;
  flex: 0;
`;
const MapBtn = styled.p`
  margin: 0;
  margin-right: 40px;
  font-weight: 400;
  font-size: 20px;
  color: ${(props) => (props.selected ? "#000" : "#999")};
  @media screen and (max-width: 1000px) {
    font-size: 12px;
  }
  cursor: pointer;
`;
const ListBtn = styled.p`
  margin: 0;
  margin-left: 40px;
  font-weight: 400;
  font-size: 20px;
  color: ${(props) => (props.selected ? "#000" : "#999")};
  @media screen and (max-width: 1000px) {
    font-size: 12px;
  }
  cursor: pointer;
`;
