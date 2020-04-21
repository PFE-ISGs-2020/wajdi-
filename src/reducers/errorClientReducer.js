import { GET_ERRORS_CLIENT } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS_CLIENT:
      return action.payload;
    default:
      return state;
  }
}