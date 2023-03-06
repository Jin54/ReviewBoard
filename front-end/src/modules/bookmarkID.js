/*
 * FIXME - 액션타입을 상수로 분리해서 사용하는 이유 중 하나는 휴먼 에러를 방지하고
 *  디버킹 툴에서 디버깅할 때 액션타입을 보고 디버깅하니까 읽기 쉽도록
 *  대문자 스네이크 케이스식으로 네이밍 하면 좋을 것 같아요.
 *  export const RESET_BOOK_MARK_ID = "bookmarkId/RESET_BOOK_MARK_ID";
 */
export const RESETBOOKMARKID = "bookmarkID/RESETBOOKMARKID";

export const resetBookmarkID = (idList) => ({
  type: RESETBOOKMARKID,
  idList: idList,
});

const initialState = [];

function bookmarkID(state = initialState, action) {
  switch (action.type) {
    case RESETBOOKMARKID:
      return [action.idList];
    default:
      return state;
  }
}

export default bookmarkID;
