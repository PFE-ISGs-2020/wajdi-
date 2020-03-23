import { SET_CURRENT_CENTRE, CENTRE_LOADING } from "../actions/types";
  
const isEmpty = require("is-empty");
  const initialState = {
    isAuthenticated: false,
    centre: {},
    loading: false 
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_CENTRE: 
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          centre: action.payload
        };
        
      case CENTRE_LOADING:
        return {
          ...state,
          loading: true
        };

      default:
        return state;
    }
  }