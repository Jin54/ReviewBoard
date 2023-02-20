import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setBookmarkData } from "../../modules/saveData";
import { setKakaoToken } from "../../modules/token";
import { inputBookmark } from "../../modules/bookmark";
import BookmarkDataAPI from "../../api/BookmarkDataAPI";

const OnClickBookmark = () => {
  const showURL = useSelector((state) => state.urlChange.name);
  const kakaoToken = useSelector((state) => state.token.kakao);
  const bookmarkData = useSelector((state) => state.saveData.bookmarkData);

  const dispatch = useDispatch();
  const SetBookmarkData = useCallback(
    (data) => {
      dispatch(setBookmarkData(data));
    },
    [dispatch]
  );
  const SetKakaoToken = useCallback(
    (token) => {
      dispatch(setKakaoToken(token));
    },
    [dispatch]
  );
  const InputBookmark = useCallback(
    (data) => {
      dispatch(inputBookmark(data));
    },
    [dispatch]
  );

  SetKakaoToken(
    "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjEsImlhdCI6MTY3NjgzNzg5OSwiZXhwIjoxNjc4MzA5MTI4fQ.kizTLEAMz6xv9SzXICwX2Y02cTUYuyzY304BLiZZnek"
  );
  var bookID = [];

  useEffect(() => {
    BookmarkDataAPI(showURL, kakaoToken, (data) => SetBookmarkData(data));

    if (bookmarkData != null) {
      bookmarkData.map((data) => bookID.push(data.id));
      InputBookmark(bookID);
    }
  }, []);
};

export default OnClickBookmark;
