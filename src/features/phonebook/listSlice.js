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





