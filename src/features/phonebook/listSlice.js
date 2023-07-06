import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const fetchDataOne = createAsyncThunk('fetchDataOne', async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/contact/${id}`); // Tek kişinin verisini getirmek için id kullandı
    return response.data.data; // Veriyi döndü
  } catch (error) {
    throw Error('Veri çekme hatası: ' + error.message);
  }
});

const fetchData = createAsyncThunk('fetchData', async () => {
  try {
    const response = await axios.get('http://localhost:5000/contact'); // bütün veriyi getirdi
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
      })
      .addCase(fetchDataOne.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataOne.fulfilled, (state, action) => {
        state.loading = false;
        const updatedContact=action.payload;
        state.data=state.data.map((contact)=> //tüm veri içinden id ye göre güncellenecek kişinin bilgilerini getirdi
          contact._id===updatedContact._id? updatedContact:contact
        )
      })
      .addCase(fetchDataOne.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default listSlice.reducer;
export { fetchData, fetchDataOne };





