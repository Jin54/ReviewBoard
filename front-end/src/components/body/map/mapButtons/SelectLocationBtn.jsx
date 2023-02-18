import styled from "styled-components";

const SelectLocationBtn = (props) => {
  return <BtnStyle onClick={() => props.setModalOpen(true)}>지역선택</BtnStyle>;
};

export default SelectLocationBtn;

const BtnStyle = styled.div`
  background: #16312c;
  border-radius: 10px;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  cursor: pointer;
`;
