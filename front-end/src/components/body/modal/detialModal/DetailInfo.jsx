// 매장 상세 중간 정보 컴포넌트 ( 영업 시간, 링크, 번호 )
import { useState } from 'react';
import styled from "styled-components";
import moment from 'moment';

import ImgComponent from "../../../ImageComponent";

const DetailInfo = (props) => {
  const [dropDown, setDropDown] = useState('20px')
  const [arrow, setArrow] = useState('downArrow.png')
  const [currentstatus, setCurrnetStatus] = useState()

  const showALlTime = () => {
    if(dropDown == '20px'){
      setDropDown('100%')
      setArrow('upArrow.png')
    }else{
      setDropDown('20px')
      setArrow('downArrow.png')
    }
  }

  return (
    <InfoWrap>
      <InfoIcon>
        <ImgComponent src={props.img} width={"100%"} />
      </InfoIcon>
      {props.txt ? (
        <InfoTxt dropDown={dropDown}>{props.txt}</InfoTxt>
      ) : (
        <InfoTxt>정보가 존재하지 않습니다.</InfoTxt>
      )}
      {props.arrow && <DropDownArrow onClick={showALlTime}>
        <ImgComponent src={arrow} width={'100%'} />
      </DropDownArrow>}
      {props.time && <CurrentStatus time={props.time} />}
    </InfoWrap>
  );
};

export default DetailInfo;

const InfoWrap = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: 'top';
  @media screen and (max-width: 1000px) {
    margin-bottom: 10px;
  }
`;
const InfoIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-right: 10px;
`;
const InfoTxt = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #999999;
  white-space: pre-wrap;
  overflow: hidden;
  height: ${(props) => props.dropDown};
  @media screen and (max-width: 1000px) {
    font-size: 12px;
  }
`;

const DropDownArrow = styled.div`
  width: 14px;
  height: 100%;
  margin-left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-top: 4px;
`




const CurrentStatus = ({time}) => {

  // const time = '매일 06:00 - 22:00' // 실제 데이터 받아올 때는 이거 지우고 CurrentStatus = ({time}) 으로 바꾸기
  // 매장 시간 데이터
  console.log(time)

  // 오늘 시간
  const nowTime = moment().format('HH:mm');

  console.log(nowTime);

  // 오늘 요일
  var week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');
  
  var today = new Date().getDay();
  var todayLabel = week[today];
  
  console.log(todayLabel)

  // 영업 상태 표시 함수  
  function status (time){
  
  // 요일을 먼저 찾기
  
  if( time.includes('매일') ){// 매일 영업 시간이 동일할 때
    if( time[3]){ //  txt에 있는 영업 시간 사이에 now 가 포함될 때
        return "영업 중";
    }else if("txt 에 있는 영업 시간 전일 때"){
        return "영업 전";
    }else{
        return "마감";
    }
  }else{ // 매일 영업 시간이 다를 때
    if(todayLabel == '월요일'){
      if(time.includes('월')){

      }
    }else if (todayLabel == '화요일'){
    
    }else if (todayLabel == '수요일'){
    
    }else if (todayLabel == '목요일'){
    
    }else if (todayLabel == '금요일'){
    
    }else if (todayLabel == '토요일'){
    
    }else if (todayLabel == '일요일'){
    
    }
  }
}
  return <CurrentStatusWrap>{status(time)}</CurrentStatusWrap>;
};

const CurrentStatusWrap = styled.p`
  font-size: 12px;
  margin-left: 10px;
  font-weight: bold;
  color: #c09567;
`