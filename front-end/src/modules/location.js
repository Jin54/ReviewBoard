const SAVELOCATION = "location/SAVELOCATION";
const SELECTLOCATIONBOOL = "location/SELECTLOCATIONBOOL";

export const saveLocation = (bigLocation, smallLocation) => ({
  type: SAVELOCATION,
  bigLocation: bigLocation,
  smallLocation: smallLocation,
});
export const selectLocation = (bool) => ({
  type: SELECTLOCATIONBOOL,
  bool: bool,
});

const initialState = {
  bigLocation: "",
  smallLocation: "",
  bool: false,
};

function location(state = initialState, action) {
  switch (action.type) {
    case SAVELOCATION:
      return {
        ...state,
        bigLocation: action.bigLocation,
        smallLocation: action.smallLocation,
      };
    case SELECTLOCATIONBOOL:
      return {
        ...state,
        bool: action.bool,
      };
    default:
      return state;
  }
}

export default location;
