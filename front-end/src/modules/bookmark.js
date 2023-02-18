export const ADDBOOKMARK = "bookmark/ADDBOOKMARK";
export const DELETEBOOKMARK = "bookmark/DELETEBOOKMARK";

export const addBookmark = (id) => ({
  type: ADDBOOKMARK,
  id: id,
});
export const deleteBookmark = (id) => ({
  type: DELETEBOOKMARK,
  id: id,
});

const initialState = [];

function bookmark(state = initialState, action) {
  switch (action.type) {
    case ADDBOOKMARK:
      return [...state, action.id];
    case DELETEBOOKMARK:
      return state.filter((id) => id !== action.id);
    default:
      return state;
  }
}

export default bookmark;
