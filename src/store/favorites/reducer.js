import { SET_FAVORITES, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "./types";

const InitialState = {
  favorites: []
};

export function reducer(state = InitialState, { type, payload }) {
  switch (type) {
    case SET_FAVORITES:
      return state.favorites.length === payload.length ? state : {
        ...state,
        favorites: payload
      }
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, payload],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter((item) => item._id !== payload),
      };
    default:
      return state;
  }
};