import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import BookmarkDataAPI from "../../api/BookmarkDataAPI";

import { setBookmarkData } from "../../modules/saveData";
import { resetBookmarkID } from "../../modules/bookmarkID";
import { RootState } from "../../modules";

// 타입을 JSX.Element -> any 로 바꾼 이유 : 오류가 뜸 (미해결)
const OnClickBookmark = (): any => {
  const showURL = useSelector((state: RootState) => state.urlChange.name);
  const userJWT = useSelector((state: RootState) => state.userData.jwt);

  const dispatch = useDispatch();
  const SetBookmarkData = useCallback(
    (data: object) => {
      dispatch(setBookmarkData(data));
    },
    [dispatch]
  );
  const ResetBookmarkID = useCallback(
    (data: number[]) => {
      dispatch(resetBookmarkID(data));
    },
    [dispatch]
  );

  useEffect(() => {
    if (userJWT == null) return;

    BookmarkDataAPI(
      showURL,
      userJWT,
      (data: object) => SetBookmarkData(data),
      (id: number[]) => ResetBookmarkID(id)
    );
  }, [showURL]);
};

export default OnClickBookmark;
