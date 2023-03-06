// 지도보기 & 리스트보기 버튼
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { setOpenListModal } from "../../modules/openBool";

/*
 * FIXME - 메인 화면 하단에 나오는 플로팅 버튼인 것 같아요.
 *  이 컴포넌트를 사용하는 곳에서 컴포넌트 명으로 용도를 이해할 수 있도록 컴포넌트 명을 지어주면 좋을 것 같아요.
 *  예) <ViewToggleButton/>
 */
const MapOrList = () => {
  const openListModal = useSelector((state) => state.openBool.listModal);
  const dispatch = useDispatch();
  /*
   * FIXME - 컨벤션을 맞춰주면 좋을 것 같아요.
   *  setOpenListModal
   */
  const SetOpenListModal = useCallback(
    (bool) => {
      dispatch(setOpenListModal(bool));
    },
    [dispatch]
  );
  const openBookmark = useSelector((state) => state.openBool.bookmark);

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
      {/*
        * FIXME - 동일한 기능을 하는 버튼이고 버튼 라벨만 바뀌고 있어요.
        *   <ListBtn onClick={()=>{setOpenListModal(true)} selected={openListModal}}>
        *      {openBookmark ? '북마크' : '리스트보기'}
        *   </ListBtn>
        *  이렇게 하면 어떨까요?
        */}
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
  // FIXME - margin: 10px auto 0;
  margin: auto;
  margin-top: 10px;
  position: fixed;
  z-index: 10;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: #00B295;
  border-radius: 6px;
  padding: 4px;
`;
const MapBtn = styled.p`
  margin: 0;
  // FIXME - 구조분해할당으로 조금 수정해보았습니다.
  //  font-weight: ${({selected}) => (selected ? "400" : "200")}; 
  font-weight: ${(props) => (props.selected ? "400" : "200")};
  font-size: 20px;
  width: 50%;
  padding: 4px 30px;
  text-align: center;
  border-radius: 5px;
  white-space:nowrap;
  color: ${(props) => (props.selected ? "#00B295" : "#fafafa")};
  background-color: ${(props) => (props.selected ? "#fafafa" : "#00B295")};
  cursor: pointer;
    @media screen and (max-width: 1000px){
      font-size: 14px;
  }
  /* transition: 0.2s ease-in; */
  &:hover{
    font-weight: 700;
  }
`;

/*
 * FIXME - 기능에 맞는 태그를 태그를 사용해주시면 좋을 것 같아요.
 *  메뉴를 변경하는 버튼이니까 button 태그를 사용하면 좋을 것 같아요
 */
const ListBtn = styled.p`
  margin: 0;
  font-weight: ${(props) => (props.selected ? "400" : "200")};
  font-size: 20px;
  width: 50%;
  padding: 4px 30px;
  text-align: center;
  border-radius: 5px;
  white-space:nowrap;
  color: ${(props) => (props.selected ? "#00B295" : "#fafafa")};
  background-color: ${(props) => (props.selected ? "#fafafa" : "#00B295")};
  cursor: pointer;
  /* transition: 0.2s ease-in; */
  &:hover{
    font-weight: 700;
  }
    @media screen and (max-width: 1000px){
      font-size: 14px;
  }
`;
