const OPENLOGIN = "openBool/OPENLOGIN";
const OPENBOOKMARK = "openBool/OPENBOOKMARK";
const OPENLISTMODAL = "opennBool/OPENLISTMODAL";
const OPENDETAILMODAL = "openBool/OPENDETAILMODAL";

export const setOpenLogin = (bool) => ({
  type: OPENLOGIN,
  bool: bool,
});
export const setOpenBookmark = (bool) => ({
  type: OPENBOOKMARK,
  bool: bool,
});

export const setOpenListModal = () => ({
  type: OPENLISTMODAL,
});

export const setOpenDetailModal = () => ({
  type: OPENDETAILMODAL,
});

const initialState = {
  login: false,
  bookmark: false,
  listModal: false,
  detailModal: false,
};

function openBool(state = initialState, action) {
  switch (action.type) {
    case OPENLOGIN:
      return {
        ...state,
        login: action.bool,
      };
    case OPENBOOKMARK:
      return {
        ...state,
        bookmark: action.bool,
      };
    case OPENLISTMODAL:
      return {
        ...state,
        listModal: !state.listModal,
      };
    case OPENDETAILMODAL:
      return {
        ...state,
        detailModal: !state.detailModal,
      };
    default:
      return state;
  }
}

export default openBool;
