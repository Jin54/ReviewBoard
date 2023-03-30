export const RESETBOOKMARKID = "bookmarkID/RESETBOOKMARKID" as const;

export const resetBookmarkID = (idList: number[]) => ({
  type: RESETBOOKMARKID,
  idList: idList,
});

type BookmarkActon = ReturnType<typeof resetBookmarkID>;

const initialState = null;

// any로 한 이유 : src/utils/useShowMarker 61번째 줄 bookmarkID[0]이 null 일 경우, 경고가 뜨기 때문에 null | number[] 로 안 함
type bookmarkIDState = any[] | null;

function bookmarkID(
  state: bookmarkIDState = initialState,
  action: BookmarkActon
) {
  switch (action.type) {
    case RESETBOOKMARKID:
      return [action.idList];
    default:
      return state;
  }
}

export default bookmarkID;
