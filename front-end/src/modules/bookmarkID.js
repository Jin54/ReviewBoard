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
