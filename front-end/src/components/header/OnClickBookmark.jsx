import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import BookmarkDataAPI from "../../api/BookmarkDataAPI";

import { setBookmarkData } from "../../modules/saveData";
import { resetBookmarkID } from "../../modules/bookmarkID";

const OnClickBookmark = () => {
  const showURL = useSelector((state) => state.urlChange.name);
  const kakaoToken = useSelector((state) => state.token.kakao);

  const dispatch = useDispatch();
  const SetBookmarkData = useCallback(
    (data) => {
      dispatch(setBookmarkData(data));
    },
    [dispatch]
  );
  const ResetBookmarkID = useCallback(
    (data) => {
      dispatch(resetBookmarkID(data));
    },
    [dispatch]
  );

  useEffect(() => {
    BookmarkDataAPI(
      showURL,
      kakaoToken,
      (data) => SetBookmarkData(data),
      (id) => ResetBookmarkID(id)
    );
  }, []);
};

export default OnClickBookmark;
