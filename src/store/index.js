import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

import { MODULE_NAME as forksModuleName } from './forks/selectors';
import { reducer as forksReducer } from './forks/reducer';

const persistForks = {
  key: 'forks',
  storage
}

const rootReducer = combineReducers({
  [forksModuleName]: persistReducer(persistForks, forksReducer)
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(store);