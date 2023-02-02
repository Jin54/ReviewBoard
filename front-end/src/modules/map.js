const INCREASE = "map/INCREASE";
const DECREASE = "map/DECREASE";

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

const initialState = {
  number: 13,
};

function map(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        number: state.number + 2,
      };
    case DECREASE:
      return {
        ...state,
        number: state.number - 2,
      };
    default:
      return state;
  }
}

export default map;