const SAVELOCATION = "location/SAVELOCATION";

export const saveLocation = (bigLocation, smallLocation) => ({
  type: SAVELOCATION,
  bigLocation: bigLocation,
  smallLocation: smallLocation,
});

const initialState = {
  bigLocation: "",
  smallLocation: "",
};

function location(state = initialState, action) {
  switch (action.type) {
    case SAVELOCATION:
      return {
        ...state,
        bigLocation: action.bigLocation,
        smallLocation: action.smallLocation,
      };
    default:
      return state;
  }
}

export default location;
