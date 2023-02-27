import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import BookmarkDataAPI from "../../api/BookmarkDataAPI";

import { setBookmarkData } from "../../modules/saveData";
import { resetBookmarkID } from "../../modules/bookmarkID";

const OnClickBookmark = () => {
  const showURL = useSelector((state) => state.urlChange.name);
  const userJWT = useSelector((state) => state.userData.jwt);

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
      userJWT,
      (data) => SetBookmarkData(data),
      (id) => ResetBookmarkID(id)
    );
  }, [showURL]);
};

export default OnClickBookmark;
