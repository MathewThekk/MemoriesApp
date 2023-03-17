import { AUTH, LOGOUT } from "../constants/actionTypeConstants";

export const authReducer = (authState = { user: null }, action) => {
  switch (action.type) {
    case AUTH:
      console.log(action.payload)
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...authState, user: action.payload };
    case LOGOUT:
      localStorage.removeItem("profile");
      return {...authState,  user:null}

    default:
      return authState;
  }
};
