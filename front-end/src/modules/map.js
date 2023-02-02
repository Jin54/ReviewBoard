const INCREASE = "map/INCREASE";
const DECREASE = "map/DECREASE";
const CURRENTUP = "map/CURRENTUP";

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const currentUp = () => ({ type: CURRENTUP });

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
    case CURRENTUP:
      return {
        ...state,
        number: 3,
      };
    default:
      return state;
  }
}

export default map;
