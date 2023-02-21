const CHANGEURL = "urlChange/CHANGEURL";

export const changeURL = (name) => ({
  type: CHANGEURL,
  name: name,
});

const initialState = {
  name: "shop",
};

function urlShow(state = initialState, action) {
  switch (action.type) {
    case CHANGEURL:
      return {
        ...state,
        name: action.name,
      };
    default:
      return state;
  }
}

export default urlShow;
