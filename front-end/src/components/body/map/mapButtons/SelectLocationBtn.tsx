import styled from "styled-components";

const SelectLocationBtn = (props: any) => {
  return <BtnStyle onClick={() => props.setModalOpen(true)}>지역선택</BtnStyle>;
};

export default SelectLocationBtn;

const BtnStyle = styled.div`
  background: #00b295;
  border-radius: 6px;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  cursor: pointer;
  transition: 0.2s ease-in;
  &:hover {
    box-shadow: inset 3px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;
