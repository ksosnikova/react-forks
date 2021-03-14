import { SET_FAVORITES, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "./types";

const InitialState = {
  favorites: []
};

export function reducer(state = InitialState, { type, payload }) {
  switch (type) {
    case SET_FAVORITES:
      return {
        ...state,
        favorites: payload
      }
    case ADD_TO_FAVORITES:
      console.log('pppp', payload)
      return {
        ...state,
        favorites: [...state.favorites, payload],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(item => item !== payload),
      };
    default:
      return state;
  }
};