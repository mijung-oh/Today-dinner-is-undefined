import React from "react";

// 액션 타입을 정한다

const GET_USER_INFO = "GETUSERINFO/clientLogin" as const;

// 상태 타입
export type UserState = {
  name: string;
  email: string;
};

//초기 상태
const InitialState: UserState = {
  name: "",
  email: "",
};

// 액션 생성한다.
export const getUserInfo = (name: string, email: string) => ({
  type: GET_USER_INFO,
  name,
  email,
});
//액션 타입
type LoginAction = ReturnType<typeof getUserInfo>;

//리듀서 생성
function reducer(state: UserState = InitialState, action: LoginAction) {
  // 상태 업데이트 로직을 구현
  switch (action.type) {
    case GET_USER_INFO:
      return { name: action.name, email: action.email };

    default:
      return state;
  }
}

export default reducer;
