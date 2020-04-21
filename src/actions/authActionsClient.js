import axios from "axios";
import setAuthClientToken from "../utils/setAuthClientToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS_CLIENT, SET_CURRENT_CLIENT, CLIENT_LOADING } from "./types";

// Register client
export const signUpClient = (ClientData, history) => dispatch => {
  axios
    .post("http://localhost:5000/Client/add", ClientData)
    .then(res => window.location = '/') // re-direct to home on successful register
    .catch(err =>
      dispatch({ 
        type: GET_ERRORS_CLIENT,
        payload: err.response.data
      })
    );
}; 

// Login - get client token
export const loginClient = clientData => dispatch => {
  axios
    .post("http://localhost:5000/Client/loginClient", clientData)
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthClientToken(token);
      // Decode token to get client data
      const decoded = jwt_decode(token);
      // Set current client
      dispatch(setCurrentClient(decoded));
      //window.location = '/profileClient'
    
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS_CLIENT,
        payload: err.response.data
      })
    );
};
// Set logged in client
export const setCurrentClient = decoded => {
  return {
    type: SET_CURRENT_CLIENT,
    payload: decoded
  };
};
// Client loading
export const setClientLoading = () => {
  return {
    type: CLIENT_LOADING
  };
};
// Log Client out
export const logoutClient = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthClientToken(false);
  // Set current Client to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentClient({}));
  window.location="/";
};