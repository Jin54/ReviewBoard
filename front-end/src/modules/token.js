const SETKAKAOTOKEN = "token/SETKAKAOTOKEN";

export const setKakaoToken = (data) => ({
  type: SETKAKAOTOKEN,
  jwttoken: data.jwttoken,
  email: data.email,
  name: data.name,
});

const initialState = {
  jwttoken:
    "",
  email:
    "",
  name:
    "",
};

function token(state = initialState, action) {
  switch (action.type) {
    case SETKAKAOTOKEN:
      // console.log(action)
      return {
        ...state,
        jwttoken: action.jwttoken,
        email: action.email,
        name: action.name,
      };
    default:
      return state;
  }
}

export default token;
