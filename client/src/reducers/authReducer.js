import { AUTH, LOGOUT } from "../constants/actionTypeConstants";

export const authReducer = (authState = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:

      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...authState, authData: action?.data };
    case LOGOUT:
      localStorage.removeItem("profile");
      return {...authState,  authData:null}

    default:
      return authState;
  }
};
