import {SET_CURRENT_CLIENT, CLIENT_LOADING } from "../actions/types";
  
  const isEmpty = require("is-empty");
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    client: null,
    isLoading: false 
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_CLIENT: 
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          client: action.payload
        };
        
      case CLIENT_LOADING:
        return {
          ...state,
          loading: true
        };

      default:
        return state;
    }
  }