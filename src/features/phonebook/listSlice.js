import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

const fetchData = createAsyncThunk('fetchData', async () => {
  try {
    const response = await axios.get('http://localhost:5000/contact'); // Veriyi getirmek için uygun API yolunu kullandı
    return response.data.data; // Veriyi dön
  } catch (error) {
    throw Error('Veri çekme hatası: ' + error.message);
  }
});

const listSlice = createSlice({
  name: 'contacts',
  initialState: { data: [], loading: false, error: null },
  reducers: {
    addContact: (state, action) => {
      if (action.payload.name && action.payload.phone) {
        state.data.push(action.payload);
        toast.success(`${action.payload.name} added`, {
          theme: 'colored',
        });
      }
    },
    updateContact: (state, action) => {
      const { _id, name, phone } = action.payload;
      const updatingContactIndex = state.data.findIndex((contact) => contact._id === _id);
      if (updatingContactIndex !== -1) {
        state.data[updatingContactIndex] = { ...state.data[updatingContactIndex], name, phone };
        toast.info(`${state.data[updatingContactIndex].name} updated`, {
          theme: 'colored',
        });
      }
    },
    deleteContact: (state, action) => {
      const { id } = action.payload;
      const deletingContact = state.data.find((contact) => contact._id === id);
      toast.error(`${deletingContact.name} deleted`, { theme: 'colored' });
      state.data = state.data.filter((contact) => contact._id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default listSlice.reducer;
export const { addContact, updateContact, deleteContact } = listSlice.actions;
export { fetchData };





