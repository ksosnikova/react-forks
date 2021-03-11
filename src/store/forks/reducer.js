import { FETCH_FORKS, SET_LOADER } from "./types";

const InitialState = {
  forks: [],
  isDataLoaded: false
};

export function reducer(state = InitialState, { type, payload }) {
  switch (type) {
    case SET_LOADER:
      return {
        ...state,
        isDataLoaded: true
      }
    case FETCH_FORKS:
      return {
        ...state,
        forks: payload,
        isDataLoaded: false
      }
    // case SET_FAVORITES:
    //   return {
    //     ...state,
    //     favorites: payload
    //   }
    default:
      return state;
  }
};