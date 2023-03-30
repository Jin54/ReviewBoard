const OPENLOGIN = "openBool/OPENLOGIN" as const;
const OPENBOOKMARK = "openBool/OPENBOOKMARK" as const;
const OPENLISTMODAL = "opennBool/OPENLISTMODAL" as const;
const OPENDETAILMODAL = "openBool/OPENDETAILMODAL" as const;
const OPENMOBILEMENU = "openBool/OPENMOBILEMENU" as const;

export const setOpenLogin = (bool: boolean) => ({
  type: OPENLOGIN,
  bool: bool,
});

export const setOpenBookmark = (bool: boolean) => ({
  type: OPENBOOKMARK,
  bool: bool,
});

export const setOpenListModal = (bool: boolean) => ({
  type: OPENLISTMODAL,
  bool: bool,
});

export const setOpenDetailModal = () => ({
  type: OPENDETAILMODAL,
});

export const setOpenMobileMenu = (bool: boolean) => ({
  type: OPENMOBILEMENU,
  bool: bool,
});

type SetOpen =
  | ReturnType<typeof setOpenLogin>
  | ReturnType<typeof setOpenBookmark>
  | ReturnType<typeof setOpenListModal>
  | ReturnType<typeof setOpenDetailModal>
  | ReturnType<typeof setOpenMobileMenu>;

const initialState = {
  login: false,
  bookmark: false,
  listModal: false,
  detailModal: false,
  mobileMenu: false,
};

type OpenState = {
  login: boolean;
  bookmark: boolean;
  listModal: boolean;
  detailModal: boolean;
  mobileMenu: boolean;
};

function openBool(state: OpenState = initialState, action: SetOpen) {
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
