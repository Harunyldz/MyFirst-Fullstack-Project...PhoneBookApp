import { configureStore } from '@reduxjs/toolkit';
import listReducer from '../features/phonebook/listSlice'


export const store = configureStore({
  reducer: {
    contacts:listReducer
  },
});
