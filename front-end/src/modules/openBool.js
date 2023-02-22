const OPENLOGIN = "openBool/OPENLOGIN";
const OPENBOOKMARK = "openBool/OPENBOOKMARK";
const OPENLISTMODAL = "opennBool/OPENLISTMODAL";
const OPENDETAILMODAL = "openBool/OPENDETAILMODAL";
const OPENMOBILEMENU = "openBool/OPENMOBILEMENU";

export const setOpenLogin = (bool) => ({
  type: OPENLOGIN,
  bool: bool,
});

export const setOpenBookmark = (bool) => ({
  type: OPENBOOKMARK,
  bool: bool,
});

export const setOpenListModal = (bool) => ({
  type: OPENLISTMODAL,
  bool: bool,
});

export const setOpenDetailModal = (bool) => ({
  type: OPENDETAILMODAL,
  bool: bool,
});

export const setOpenMobileMenu = (bool) => ({
  type: OPENMOBILEMENU,
  bool: bool,
});

const initialState = {
  login: false,
  bookmark: false,
  listModal: false,
  detailModal: false,
  mobileMenu: false,
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
        listModal: action.bool,
      };
    case OPENDETAILMODAL:
      return {
        ...state,
        detailModal: !state.detailModal,
      };
    case OPENMOBILEMENU:
      return {
        ...state,
        mobileMenu: action.bool,
      };
    default:
      return state;
  }
}

export default openBool;
