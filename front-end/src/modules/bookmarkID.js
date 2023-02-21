export const ADDBOOKMARKID = "bookmarkID/ADDBOOKMARKID";
export const RESETBOOKMARKID = "bookmarkID/RESETBOOKMARKID";

export const addBookmarkID = (id) => ({
  type: ADDBOOKMARKID,
  id: id,
});
export const resetBookmarkID = (idList) => ({
  type: RESETBOOKMARKID,
  idList: idList,
});

const initialState = [];

function bookmarkID(state = initialState, action) {
  switch (action.type) {
    case ADDBOOKMARKID:
      if (!state.includes(action.id)) return [...state, action.id];
      return state;
    case RESETBOOKMARKID:
      return [action.idList];
    default:
      return state;
  }
}

export default bookmarkID;
