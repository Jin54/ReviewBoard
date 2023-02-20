export const ADDBOOKMARKID = "bookmarkID/ADDBOOKMARKID";
export const DELETEBOOKMARKID = "bookmarkID/DELETEBOOKMARKID";
export const RESETBOOKMARKID = "bookmarkID/RESETBOOKMARKID";

export const addBookmarkID = (id) => ({
  type: ADDBOOKMARKID,
  id: id,
});
export const deleteBookmarkID = (id) => ({
  type: DELETEBOOKMARKID,
  id: id,
});
export const resetBookmarkID = () => ({
  type: RESETBOOKMARKID,
});

const initialState = [];

function bookmarkID(state = initialState, action) {
  switch (action.type) {
    case ADDBOOKMARKID:
      if (!state.includes(action.id)) return [...state, action.id];
    case DELETEBOOKMARKID:
      return state.filter((id) => id !== action.id);
    case RESETBOOKMARKID:
      return (state = []);
    default:
      return state;
  }
}

export default bookmarkID;
