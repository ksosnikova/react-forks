import { FETCH_FORKS, SET_LOADER } from "./types";

const InitialState = {
  forks: [],
  isDataLoaded: false,
  repo: null,
  totalPages: null,
  errors: null
};

export function reducer(state = InitialState, { type, payload }) {
  switch (type) {
    case SET_LOADER:
      return {
        ...state,
        isDataLoaded: payload
      }
    case FETCH_FORKS:
      return {
        ...state,
        forks: payload.data,
        repo: payload.linkToGitRep,
        isDataLoaded: false,
        totalPages: payload.pagesTotal
      }
    default:
      return state;
  }
};