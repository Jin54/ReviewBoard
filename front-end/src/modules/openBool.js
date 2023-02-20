const OPENBOOKMARK = "opetBool/OPENBOOKMARK";
const OPENLISTMODAL = "opetBool/OPENLISTMODAL";
const OPENDETAILMODAL = "opetBool/OPENDETAILMODAL";

export const setOpenBookmark = () => ({
  type: OPENBOOKMARK,
});

export const setOpenListModal = () => ({
  type: OPENLISTMODAL,
});

export const setOpenDetailModal = () => ({
  type: OPENDETAILMODAL,
});

const initialState = {
  bookmark: false,
  listModal: false,
  detailModal: false,
};

function openBool(state = initialState, action) {
  switch (action.type) {
    case OPENBOOKMARK:
      return {
        ...state,
        bookmark: !state.bookmark,
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
