import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_CENTRE, CENTRE_LOADING } from "./types";

// Register centre
export const signUpCentre = (centreData, history) => dispatch => {
  axios
    .post("http://localhost:5000/Centre/add", centreData)
    .then(res => history.push("/")) // re-direct to home on successful register
    .catch(err =>
      dispatch({ 
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}; 

// Login - get center token
export const loginCentre = centreData => dispatch => {
  axios
    .post("http://localhost:5000/Centre/loginCentre", centreData)
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get center data
      const decoded = jwt_decode(token);
      // Set current center
      dispatch(setCurrentCentre(decoded));
      //window.location="/dashboardResponsable";
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Set logged in center
export const setCurrentCentre = decoded => {
  return {
    type: SET_CURRENT_CENTRE,
    payload: decoded
  };
};
// Center loading
export const setCentreLoading = () => {
  return {
    type: CENTRE_LOADING
  };
};
// Log Centre out
export const logoutCentre = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current Centre to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentCentre({}));
};