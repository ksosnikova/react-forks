export const MODULE_NAME = 'forks';
export const selectForks = state => state[MODULE_NAME].forks;
export const selectLoader = state => state[MODULE_NAME].isDataLoaded;
export const selectRepo = state => state[MODULE_NAME].repo;
export const selectTotalPages = state => state[MODULE_NAME].totalPages;
// export const selectFavorites = state => state[MODULE_NAME].favorites;