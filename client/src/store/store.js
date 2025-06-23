import { createStore } from "redux";

const initialState = {
  user: { login: null },
  refresh: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "user":
      return { ...state, user: action.payload };

    case "refresh":
      return { ...state, refresh: !state.refresh };

    default:
      return state; // ✅ Always return current state if no match
  }
}

export default createStore(reducer);
