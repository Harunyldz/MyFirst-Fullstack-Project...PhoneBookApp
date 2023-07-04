import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

const fetchData = createAsyncThunk('fetchData', async () => {
  try {
    const response = await axios.get('http://localhost:5000/contact'); // Veriyi getirmek için uygun API yolunu kullanın
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






// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { contactsList } from '../../Data'
// import { toast } from 'react-toastify'
// import axios from 'axios'

// // const initialState = {
// //     data: [],
// //     loading: false,
// //     error: ""
// // }

// // export const fetchContacts = createAsyncThunk('fetchContacts', async () => {
// //     const response = await axios.get('https://jsonplaceholder.typicode.com/users')
// //     return response.data;
// // })

// const listSlice = createSlice({
//     name: 'contacts',
//     initialState: contactsList,
//     // initialState,
//     reducers: {
//         addContact: (state, action) => {
//             if (action.payload.name && action.payload.phone) {
//                 state.push(action.payload)
//                 toast.success(`${action.payload.name} added`, {
//                     theme: 'colored'
//                 })
//             }

//         },
//         updateContact: (state, action) => {
//             const { id, name, phone } = action.payload
//             const updatingContact = state.find(contact => contact.id == id)
//             if (updatingContact) {
//                 updatingContact.name = name
//                 updatingContact.phone = phone
//                 toast.info(`${updatingContact.name} updated`, {
//                     theme: 'colored'
//                 })

//             }
//         },
//         deleteContact: (state, action) => {
//             const { id } = action.payload
//             const deletingContact = state.find(contact => contact.id === id)
//             if (deletingContact) {
//                 return state.filter(contact => contact.id !== id)
//             }

//         }
//     },
//     // extraReducers: (builder) => {
//     //     builder.addCase(fetchContacts.pending, (state, action) => {
//     //         state.loading = true;
//     //         state.error = ""
//     //     })
//     //     builder.addCase(fetchContacts.fulfilled, (state, action) => {
//     //         state.data = action.payload;
//     //         state.loading = false
//     //     })
//     //     builder.addCase(fetchContacts.rejected, (state, action) => {
//     //         state.loading = false
//     //         state.error = "Error fetching users data"
//     //     })
//     // }
// })

// export default listSlice.reducer;
// export const { addContact, updateContact, deleteContact } = listSlice.actions