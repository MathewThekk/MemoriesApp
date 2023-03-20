import { AUTH } from "../constants/actionTypeConstants";
import * as api from "../api/api.js";

export const auth = (user) => (dispatch) => {
  try {
    const action = { type: AUTH, payload: user };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    console.log(data);
    const action = { type: AUTH, data };
    dispatch(action);
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
export const signIn = (formData, history) => async (dispatch) => {
    try {
      const { data, status } = await api.signIn(formData);
  
      if (status === 200) {
        const action = { type: AUTH, data };
        dispatch(action);
        history.push("/");
      } else {
        console.log(data);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  };
  