const CHANGE = "restaurantModal/CHANGE";
const MODALOPEN = "restaurantModal/MODALOPEN";

export const change = (id) => ({
  type: CHANGE,
  id: id,
});
export const modalopen = (bool) => ({
  type: MODALOPEN,
  bool: bool,
});

const initialState = {
  id: "",
  open: false,
};

function restaurantModal(state = initialState, action) {
  switch (action.type) {
    case CHANGE:
      return {
        ...state,
        id: action.id,
      };
    case MODALOPEN:
      return {
        ...state,
        open: action.bool,
      };
    default:
      return state;
  }
}

export default restaurantModal;
