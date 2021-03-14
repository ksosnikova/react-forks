import { FETCH_FORKS, SET_LOADER } from "./types";

export const fetchForks = (payload) => ({
  type: FETCH_FORKS,
  payload
});

export const setLoader = (payload) => ({
  type: SET_LOADER,
  payload
});


