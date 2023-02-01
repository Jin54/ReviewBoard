const CHANGE = "restaurantModal/CHANGE";

export const change = (title, reviewNum) => ({
  type: CHANGE,
  title: title,
  reviewNum: reviewNum,
});

const initialState = {
  name: "",
  reviewNum: 10,
};

function restaurantModal(state = initialState, action) {
  switch (action.type) {
    case CHANGE:
      return {
        ...state,
        name: action.title,
        // reviewNum: action.reviewNum,
        reviewNum: 100,
      };
    default:
      return state;
  }
}

export default restaurantModal;
