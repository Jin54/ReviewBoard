const INCREASE = "map/INCREASE";
const DECREASE = "map/DECREASE";
const CURRENTUP = "map/CURRENTUP";
const RESETXY = "map/RESETXY";
const MARKERS = "map/MARKERS";
const CHANGESIZE = "map/CHANGESIZE";
const CURRENTXY = "map/CURRENTXY";

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const currentUp = () => ({ type: CURRENTUP });
export const resetxy = (x, y) => ({
  type: RESETXY,
  x: x,
  y: y,
});
export const markers = (data) => ({
  type: MARKERS,
  data: data,
});
export const changeSize = (size) => ({
  type: CHANGESIZE,
  number: size,
});
export const currentxy = (x, y) => ({
  type: CURRENTXY,
  currentX: x,
  currentY: y,
});

const initialState = {
  number: 12,
  x: 36.5,
  y: 128,
  data: [],
  currentX: 0,
  currentY: 0,
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
    case RESETXY:
      return {
        ...state,
        x: action.x,
        y: action.y,
      };
    case MARKERS:
      return {
        ...state,
        data: action.data,
      };
    case CHANGESIZE:
      return {
        ...state,
        number: action.number,
      };
    case CURRENTXY:
      return {
        ...state,
        currentX: action.currentX,
        currentY: action.currentY,
      };
    default:
      return state;
  }
}

export default map;
