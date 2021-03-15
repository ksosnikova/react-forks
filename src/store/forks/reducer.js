import { FETCH_FORKS, SET_LOADER } from "./types";

const InitialState = {
  forks: [],
  isDataLoaded: false,
  owner: null,
  repository: null,
  lastPage: false,
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
        owner: payload.owner,
        repository: payload.repository,
        isDataLoaded: false,
        lastPage: payload.lastPage
      }
    default:
      return state;
  }
};