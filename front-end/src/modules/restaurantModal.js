const CHANGE = "restaurantModal/CHANGE";

export const change = (title, add, reviewNum) => ({
  type: CHANGE,
  title: title,
  add: add,
  reviewNum: reviewNum,
});

const initialState = {
  name: "",
  add: "",
  reviewNum: 10,
};

function restaurantModal(state = initialState, action) {
  switch (action.type) {
    case CHANGE:
      return {
        ...state,
        name: action.title,
        add: action.add,
        // reviewNum: action.reviewNum,
        reviewNum: 100,
      };
    default:
      return state;
  }
}

export default restaurantModal;
