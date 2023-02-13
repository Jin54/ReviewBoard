const CHANGE = "urlChange/CHANGE";

export const change = (name) => ({
  type: CHANGE,
  name: name,
});

const initialState = {
  name: "shop",
};

function urlShow(state = initialState, action) {
  switch (action.type) {
    case CHANGE:
      return {
        ...state,
        name: action.name,
      };
    default:
      return state;
  }
}

export default urlShow;
