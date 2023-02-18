import styled from "styled-components";
import BounceLoader from "react-spinners/FadeLoader";

const Loading = () => {
  return (
    <LoadingWrap>
      <BounceLoader size={60} color="#c09567" />
    </LoadingWrap>
  );
};

export default Loading;

const LoadingWrap = styled.div`
  display: flex;
  background: #ffffff;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  justify-items: center;
  align-items: center;
  justify-content: center;
`;
