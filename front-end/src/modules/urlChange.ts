const CHANGEURL = "urlChange/CHANGEURL" as const;

export const changeURL = (name: string) => ({
  type: CHANGEURL,
  name: name,
});

type URLAction = ReturnType<typeof changeURL>;

const initialState = {
  name: "shop",
};

export type URLState = {
  name: string;
};

function urlShow(state: URLState = initialState, action: URLAction) {
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
