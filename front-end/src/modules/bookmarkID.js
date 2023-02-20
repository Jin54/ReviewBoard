export const ADDBOOKMARKID = "bookmark/ADDBOOKMARKID";
export const DELETEBOOKMARKID = "bookmark/DELETEBOOKMARKID";

export const addBookmarkID = (id) => ({
  type: ADDBOOKMARKID,
  id: id,
});
export const deleteBookmarkID = (id) => ({
  type: DELETEBOOKMARKID,
  id: id,
});

const initialState = [];

function bookmarkID(state = initialState, action) {
  switch (action.type) {
    case ADDBOOKMARKID:
      if (!state.includes(action.id)) return [...state, action.id];
    case DELETEBOOKMARKID:
      return state.filter((id) => id !== action.id);
    default:
      return state;
  }
}

export default bookmarkID;
