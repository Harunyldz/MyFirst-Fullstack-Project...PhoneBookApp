import React from 'react';
// import { Counter } from './features/counter/Counter';
import List from './features/phonebook/List';
import Form from './features/phonebook/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Edit from './features/phonebook/Edit';
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'

function App() {
  return (
    <BrowserRouter>
    <ToastContainer/>
      <div className='vh-100 container-sm d-flex align-items-center flex-column justify-content-center w-50 p-2 bg-secondary'>
        <Routes>
          <Route path='/' element={<List />}></Route>
          <Route path='/create' element={<Form/>}></Route>
          <Route path='/edit/:id' element={<Edit/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
