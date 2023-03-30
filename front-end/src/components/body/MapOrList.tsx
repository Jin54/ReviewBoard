// 지도보기 & 리스트보기 버튼
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../modules";

import { setOpenListModal } from "../../modules/openBool";

const MapOrList = () => {
  const openListModal = useSelector(
    (state: RootState) => state.openBool.listModal
  );
  const dispatch = useDispatch();
  const SetOpenListModal = useCallback(
    (bool: boolean) => {
      dispatch(setOpenListModal(bool));
    },
    [dispatch]
  );
  const openBookmark = useSelector(
    (state: RootState) => state.openBool.bookmark
  );

  return (
    <MapOrListWrap>
      <MapBtn
        onClick={() => {
          SetOpenListModal(false);
        }}
        selected={!openListModal}
      >
        지도보기
      </MapBtn>
      {openBookmark ? (
        <ListBtn
          onClick={() => {
            SetOpenListModal(true);
          }}
          selected={openListModal}
        >
          북마크
        </ListBtn>
      ) : (
        <ListBtn
          onClick={() => {
            SetOpenListModal(true);
          }}
          selected={openListModal}
        >
          리스트보기
        </ListBtn>
      )}
    </MapOrListWrap>
  );
};

export default MapOrList;

const MapOrListWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: auto;
  margin-top: 10px;
  position: fixed;
  z-index: 10;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: #00b295;
  border-radius: 6px;
  padding: 4px;
`;
const MapBtn = styled.p<MapBtnType>`
  margin: 0;
  font-weight: ${(props) => (props.selected ? "400" : "200")};
  font-size: 20px;
  width: 50%;
  padding: 4px 30px;
  text-align: center;
  border-radius: 5px;
  white-space: nowrap;
  color: ${(props) => (props.selected ? "#00B295" : "#fafafa")};
  background-color: ${(props) => (props.selected ? "#fafafa" : "#00B295")};
  cursor: pointer;
  @media screen and (max-width: 1000px) {
    font-size: 14px;
  }
  /* transition: 0.2s ease-in; */
  &:hover {
    font-weight: 700;
  }
`;
interface MapBtnType {
  selected: boolean;
}

const ListBtn = styled.p<ListBtnType>`
  margin: 0;
  font-weight: ${(props) => (props.selected ? "400" : "200")};
  font-size: 20px;
  width: 50%;
  padding: 4px 30px;
  text-align: center;
  border-radius: 5px;
  white-space: nowrap;
  color: ${(props) => (props.selected ? "#00B295" : "#fafafa")};
  background-color: ${(props) => (props.selected ? "#fafafa" : "#00B295")};
  cursor: pointer;
  /* transition: 0.2s ease-in; */
  &:hover {
    font-weight: 700;
  }
  @media screen and (max-width: 1000px) {
    font-size: 14px;
  }
`;
interface ListBtnType {
  selected: boolean;
}
