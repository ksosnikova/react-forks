import { FETCH_FORKS } from "./types";

const InitialState = {
  forks: []
};

export function reducer(state = InitialState, { type, payload }) {
  switch (type) {
    case FETCH_FORKS:
      return {
        ...state,
        forks: payload
      }
    default:
      return state;
  }
};