const SETKAKAOTOKEN = "token/SETKAKAOTOKEN";

export const setKakaoToken = (token) => ({
  type: SETKAKAOTOKEN,
  token: token,
});

const initialState = {
  kakao:
    "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjEsImlhdCI6MTY3NjgzNzg5OSwiZXhwIjoxNjc4MzA5MTI4fQ.kizTLEAMz6xv9SzXICwX2Y02cTUYuyzY304BLiZZnek",
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
