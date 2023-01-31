/**
 * Name : ImgComponent
 * Desc : Img 공통 컴포넌트
 * Property
 *  - class : 이미지 클래스
 *  - src : 이미지 경로
 *  - width : 이미지 가로 사이즈
 **/

const ImgComponent = props => {
  return (
    <img
      className={props.class}
      src={process.env.PUBLIC_URL + '/img/' + props.src}
      alt={'img'}
      onClick={props.onClick}
      style={{width:props.width}}
    />
  )
}
export default ImgComponent
