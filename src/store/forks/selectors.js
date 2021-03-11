export const MODULE_NAME = 'forks';
export const selectForks = state => state[MODULE_NAME].forks;
export const selectLoader = state => state[MODULE_NAME].isDataLoaded;
// export const selectFavorites = state => state[MODULE_NAME].favorites;