const CHANGE = "restaurantModal/CHANGE";

export const change = (id) => ({
  type: CHANGE,
  id: id,
  // add: add,
  // reviewNum: reviewNum,
});

const initialState = {
  id: "",
  // add: "",
  // reviewNum: 10,
};

function restaurantModal(state = initialState, action) {
  switch (action.type) {
    case CHANGE:
      return {
        ...state,
        id: action.id,
        // add: action.add,
        // reviewNum: action.reviewNum,
        // reviewNum: 100,
      };
    default:
      return state;
  }
}

export default restaurantModal;
