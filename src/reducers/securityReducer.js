import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  user: {},
  validToken: false,
};

const booleanActionPayload = (payload) => {
  if (payload) {
    return true;
  } else {
    return false;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: booleanActionPayload(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
}
