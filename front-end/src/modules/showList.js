const OPENLISTPAGE = "showList/OPENLISTPAGE";
const CLOSELISTPAGE = "showList/CLOSELISTPAGE";

export const openListPage = () => ({
  type: OPENLISTPAGE,
  bool: true,
});
export const closeListPage = () => ({
  type: CLOSELISTPAGE,
  bool: false,
});

const initialState = {
  bool: false,
};

function showList(state = initialState, action) {
  switch (action.type) {
    case OPENLISTPAGE:
      return {
        ...state,
        bool: action.bool,
      };
    case CLOSELISTPAGE:
      return {
        ...state,
        bool: action.bool,
      };
    default:
      return state;
  }
}

export default showList;
