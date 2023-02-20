const SETKAKAOTOKEN = "token/SETKAKAOTOKEN";

export const setKakaoToken = (token) => ({
  type: SETKAKAOTOKEN,
  token: token,
});

const initialState = {
  kakao: null,
};

function token(state = initialState, action) {
  switch (action.type) {
    case SETKAKAOTOKEN:
      return {
        ...state,
        kakao: action.token,
      };
    default:
      return state;
  }
}

export default token;
