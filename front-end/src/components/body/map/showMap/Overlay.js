import "../../../../style/map.scss";

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
  //   HeaderCloseBtn.onclick = () => {
  //     content.setMap(null);
  //   };
  contentHeader.appendChild(HeaderCloseBtn);

  var infowrap = document.createElement("div");
  infowrap.className = "infowrap";
  infowrap.innerHTML =
    '<div class="imgwrap">' +
    "<img src='" +
    (data.thumbnail != null
      ? data.thumbnail
      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg") +
    "'><img>" +
    "</div>" +
    '<div class="info">' +
    '<p class="address">' +
    data.numberAddress +
    "</p>" +
    '<p class="scope">리뷰 ' +
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
