const INCREASE = "mapSize/INCREASE";
const DECREASE = "mapSize/DECREASE";

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

const initialState = {
  number: 11,
};

function mapSize(state = initialState, action) {
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

export default mapSize;
