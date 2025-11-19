import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import React from 'react';
import store from 'store';

type ModalOptions = {
  afterClosed?: () => void;
  className?: string;
  zIndex?: number;
  title?: React.ReactNode;
  width?: number | string;
  centered?: boolean;
  closable?: boolean;
  subtractHeight?: number;
  destroyOnClose?: boolean;
};

type ICommonModalProps = {
  content: React.ReactNode;
  options?: ModalOptions;
};

interface IModalDetail extends ICommonModalProps {
  modalId: number;
}

type IInitialState = {
  modalList: IModalDetail[];
};

const initialState: IInitialState = {
  modalList: [],
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    add: (state, action: PayloadAction<IModalDetail>) => {
      state.modalList.push(action.payload);
    },
    remove: (state) => {
      state.modalList.pop();
    },
    clear: (state) => {
      state.modalList = initialState.modalList;
    },
  },
});
const { add, remove, clear } = modalSlice.actions;

const removeModal = () => store.dispatch(remove());

const clearModal = () => store.dispatch(clear());

const openModal = (props: ICommonModalProps) => {
  const { modal } = store.getState();
  store.dispatch(add({ ...props, modalId: modal.modalList.length }));
};

export { clearModal, openModal, removeModal };

export default modalSlice.reducer;
