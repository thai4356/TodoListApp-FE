import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { APP, KEY_AUTH } from 'config/constants';
import { app, navigateToPublicRoute } from 'routes';
import store from 'store';
import { UserLoginRes } from 'types/SwaggerTypeUser';
import { checkLoginUser } from 'config/api/index';

type UserState = {
  [APP.USER]: UserLoginRes | undefined;
};

const initialState: UserState = {
  [APP.USER]: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserLoginRes | undefined>) => {
      return {
        ...state,
        [app]: action.payload,
      };
    },
    logout: (state) => {
      return {
        ...state,
        [app]: undefined,
      };
    },
  },
});

// Action creators are generated for each case reducer function
const { loginUser, logout } = userSlice.actions;

const login = (state: UserLoginRes) => {
  store.dispatch(loginUser(state));
  const accessToken = store.getState().user[APP.USER]?.accessToken;
  if (accessToken) {
    window.localStorage.setItem(KEY_AUTH[app], accessToken);
  }
};

const logoutUser = () => {
  store.dispatch(logout());
  if (checkLoginUser()) window.location.assign(navigateToPublicRoute());
  window.localStorage.removeItem(KEY_AUTH[app]);
};

const userReducer = userSlice.reducer;

export { login, logoutUser };
export default userReducer;
