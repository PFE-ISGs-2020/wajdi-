import { CENTRE_LOADED,SET_CURRENT_CENTRE, CENTRE_LOADING } from "../actions/types";
  
  const isEmpty = require("is-empty");
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    centre: null,
    isLoading: false 
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_CENTRE: 
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          centre: action.payload
        };
       
      default:
        return state;
    }
  }