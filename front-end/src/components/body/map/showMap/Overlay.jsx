// const Overlay = () => {
//   return
//   (   var content = document.createElement("div");
//       content.className = "wrap";

//       var contentHeader = document.createElement("div");
//       contentHeader.className = "header";
//       content.appendChild(contentHeader);

//       var HeaderTitle = document.createElement("p");
//       HeaderTitle.innerHTML = data.name;
//       contentHeader.appendChild(HeaderTitle);

//       var HeaderCloseBtn = document.createElement("div");
//       HeaderCloseBtn.className = "closeimgWrap";
//       HeaderCloseBtn.innerHTML =
//         '<img src="https://i.postimg.cc/ZYjNRKj6/close-white.png"></img>';
//       HeaderCloseBtn.onclick = function () {
//         overlay.setMap(null);
//       };
//       contentHeader.appendChild(HeaderCloseBtn);

//       var infowrap = document.createElement("div");
//       infowrap.className = "infowrap";
//       infowrap.innerHTML =
//         '<div class="imgwrap">' +
//         "<img src='" +
//         data.thumbnail +
//         "'><img>" +
//         "</div>" +
//         '<div class="info">' +
//         '<p class="address">' +
//         data.numberAddress +
//         "</p>" +
//         '<p class="scope">리뷰 ' +
//         data.review_rating +
//         "점</p>" +
//         '<p class="review"> 리뷰' +
//         data.review_number +
//         "개</p>" +
//         "</div>";
//       infowrap.onclick = function () {
//         SetDetailID(data.id);
//         props.setOpenDetailModal(true);
//       };
//       content.appendChild(infowrap);
//   )
// };

// export default Overlay;
