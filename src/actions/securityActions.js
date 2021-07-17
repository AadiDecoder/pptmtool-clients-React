import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJWToken from "../../src/securityUtils/setJWToken";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async (dispatch) => {
  try {
    console.log("adarsh inside createNewuser");
    await axios.post("http://localhost:8080/api/users/register", newUser);
    history.push("/login");
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (Err) {
    dispatch({
      type: GET_ERRORS,
      payload: Err.response.data,
    });
  }
};

export const login = (LoginRequest, history) => async (dispatch) => {
  try {
    //post => login request
    console.log(LoginRequest);
    const res = await axios.post(
      "http://localhost:8080/api/users/login",
      LoginRequest
    );
    console.log(res.data);

    //post extract the token from res.dat
    const token = res.data.token;
    console.log(token);
    //store the token in the localStorage
    localStorage.setItem("jwsToken", token);
    console.log("after local storage");
    //set our token in the header ***
    setJWToken(token);
    console.log("afetr jwt settoken");
    //decode the token on react
    const decoded = jwt_decode(token);
    console.log(decoded);
    //dispatch to our securityReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded,
    });
  } catch (Err) {
    console.log("hi adarsh");
    dispatch({
      type: GET_ERRORS,
      payload: Err.response.data,
    });
  }
};
