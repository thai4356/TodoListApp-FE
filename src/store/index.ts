import { configureStore } from '@reduxjs/toolkit';

import localeReducer from './slices/localeSlice.ts';
import modalReducer from './slices/modalSlice.ts';
import userReducer from './slices/userSlice.ts';
// import logger from './logger';

export default configureStore({
  devTools: import.meta.env.DEV,
  reducer: {
    user: userReducer,
    modal: modalReducer,
    locale: localeReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware({
      thunk: {
        extraArgument: () => {},
      },
      serializableCheck: false,
    });

    // if (import.meta.env.DEV) {
    //   return defaultMiddleware.concat(logger);
    // }

    return defaultMiddleware;
  },
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers({
      autoBatch: false,
    }),
});
