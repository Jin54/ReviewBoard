const INCREASE = "map/INCREASE";
const DECREASE = "map/DECREASE";
const CURRENTUP = "map/CURRENTUP";
const RESETXY = "map/RESETXY";
const MARKERS = "map/MARKERS";
const CHANGESIZE = "map/CHANGESIZE";
const CURRENTXY = "map/CURRENTXY";
const SETBOUNDS = "map/SETBOUNDS";

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
export const setbounds = (ha, qa, oa, pa, radius) => ({
  type: SETBOUNDS,
  ha: ha,
  qa: qa,
  oa: oa,
  pa: pa,
  radius: radius,
});

const initialState = {
  number: 12,
  x: 36.5,
  y: 128,
  data: [],
  currentX: 0,
  currentY: 0,
  ha: {
    ha: 0,
    qa: 0,
    oa: 0,
    pa: 0,
  },
  radius: 250,
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
    case SETBOUNDS:
      if (action.radius === 0) {
        action.radius = 1;
      }

      return {
        ...state,
        ha: {
          ha: action.ha,
          qa: action.qa,
          oa: action.oa,
          pa: action.pa,
        },
        radius: action.radius,
      };
    default:
      return state;
  }
}

export default map;
