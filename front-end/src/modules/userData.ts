export const SETUSERTOKEN = "userData/SETUSERTOKEN" as const;
export const SETUSERNAME = "userData/SETUSERNAME" as const;
export const SETUSEREMAIL = "userData/SETUSEREMAIL" as const;
// export const SETUSERDATA = "userData/SETUSERDATA" as const;

export const setUserToken = (jwt: string) => ({
  type: SETUSERTOKEN,
  jwt: jwt,
});

export const setUserName = (name: string) => ({
  type: SETUSERNAME,
  name: name,
});

export const setUserEmail = (email: string) => ({
  type: SETUSEREMAIL,
  email: email,
});

//액션에 부가적으로 필요한 값을 payload 라는 이름으로 통일한다. -> 필요한 건지 검토 필요
// export const setUserData = (diff: string) => ({
//   type: SETUSERDATA,
//   payload: diff,
// });

//모든 액션 객체에 대한 타입
type SetUserAction =
  | ReturnType<typeof setUserToken>
  | ReturnType<typeof setUserName>
  | ReturnType<typeof setUserEmail>;
// | ReturnType<typeof setUserData>;

//이 리덕스 모듈에서 관리 할 상태의 타입 선언 (초기 값)
type UserState = {
  jwt: string | null;
  name: null | string;
  email: null | string;
};

const initialState = {
  jwt: null,
  name: null,
  email: null,
};

function userData(state: UserState = initialState, action: SetUserAction) {
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

// TypeScript에서 리덕스 사용하기
// https://react.vlpt.us/using-typescript/05-ts-redux.html
