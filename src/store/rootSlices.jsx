import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authSlice } from './auth/authSlice';

const persistConfig = {
  key: 'sessions',
  storage: storage,
  whitelist: ['userData'],
};

const persistUser = persistReducer(persistConfig, authSlice.reducer);

const rootSlices = combineReducers({
  userData: persistUser,
});

export default rootSlices;
