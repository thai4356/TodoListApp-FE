import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KEY_LANGUAGE, LANG } from 'config/constants';
import store from 'store';

type LocaleState = {
  lang?: (typeof LANG)[keyof typeof LANG];
};

const initialState: LocaleState = {
  lang: (window.localStorage.getItem(KEY_LANGUAGE) as LocaleState['lang']) ?? LANG.VI,
};

const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    changeLang: (state, action: PayloadAction<LocaleState['lang']>) => {
      state.lang = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
const { changeLang } = localeSlice.actions;

const setLang = (state: Exclude<LocaleState['lang'], undefined>) => {
  store.dispatch(changeLang(state));
  window.localStorage.setItem(KEY_LANGUAGE, state);
};

const localeReducer = localeSlice.reducer;

export { setLang };
export default localeReducer;
