import "../../../../style/map.scss";

/*
 * FIXME - Modal을 띄우는 함수인 것 같아요.
 *  react portal을 이용해서 띄우는 것도 좋은 방법일 것 같아요.
 */
const Overlay = (data, SetDetailID, SetOpenDetailModal) => {
  var content = document.createElement("div");
  content.className = "wrap";

  var contentHeader = document.createElement("div");
  contentHeader.className = "header";
  content.appendChild(contentHeader);

  var HeaderTitle = document.createElement("p");
  HeaderTitle.innerHTML = data.name;
  contentHeader.appendChild(HeaderTitle);

  var HeaderCloseBtn = document.createElement("div");
  HeaderCloseBtn.className = "closeimgWrap";
  HeaderCloseBtn.innerHTML =
    '<img src="https://i.postimg.cc/ZYjNRKj6/close-white.png"></img>';
  contentHeader.appendChild(HeaderCloseBtn);

  var infowrap = document.createElement("div");
  infowrap.className = "infowrap";
  infowrap.innerHTML =
    '<div class="imgwrap">' +
    `      <img
        src="` +
    data.thumbnail +
    `"
        onError="this.src='https://i.postimg.cc/m2TV33ps/noImage.jpg'"
      />` +
    "</div>" +
    '<div class="info">' +
    '<p class="address">' +
    data.numberAddress +
    "</p>" +
    '<p class="scope">별점 ' +
    data.review_rating +
    "점</p>" +
    '<p class="review"> 리뷰' +
    data.review_number +
    "개</p>" +
    "</div>";
  infowrap.onclick = () => {
    SetDetailID(data.id);
    SetOpenDetailModal();
  };
  content.appendChild(infowrap);

  return content;
};

export default Overlay;
