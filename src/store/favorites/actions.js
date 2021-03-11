import { SET_FAVORITES, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "./types";

export const setFavorites = (payload) => ({
  type: SET_FAVORITES,
  payload
});

export const addToFavorites = (payload) => ({
  type: ADD_TO_FAVORITES,
  payload
});

export const removeFromFavorites = (payload) => ({
  type: REMOVE_FROM_FAVORITES,
  payload
});