export const SETUSERTOKEN = "userData/SETUSERTOKEN";
export const SETUSERNAME = "userData/SETUSERNAME";
export const SETUSEREMAIL = "userData/SETUSEREMAIL";

export const setUserData = (jwt) => ({
  type: SETUSERTOKEN,
  jwt: jwt,
});

export const setUserName = (name) => ({
  type: SETUSERNAME,
  name: name,
});

export const setUserEmail = (email) => ({
  type: SETUSEREMAIL,
  email: email,
});

const initialState = {
  jwt: null,
  name: null,
  email: null,
};

function userData(state = initialState, action) {
  switch (action.type) {
    case SETUSERTOKEN:
      return {
        ...state,
        jwt: action.jwt,
      };
    case SETUSERNAME:
      return {
        ...state,
        name: action.name,
      };
    case SETUSEREMAIL:
      return {
        ...state,
        email: action.email,
      };
    default:
      return state;
  }
}

export default userData;
