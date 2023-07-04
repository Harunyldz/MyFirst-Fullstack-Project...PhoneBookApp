import React, { useState } from 'react'
import { addContact } from './listSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function Form() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const contacts=useSelector((state)=>state.contacts.data)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleContact =async (event) => {
     event.preventDefault();
     const newContact={
        id:contacts.length>0? contacts[contacts.length-1].id+1:1,
        name:name.toLocaleUpperCase(),
        phone,
     };

     try{
        await axios.post('http://localhost:5000/contact', newContact);
        dispatch(addContact(newContact));
        navigate('/');
     }
     catch(error){
        console.error('Kişi eklenirken bir hata oluştu',error)
     }
    }
    return (
        <div className='w-50 p-3'>
            <h2 className='mb-5 text-center text-white display-5'>Add New Contact</h2>
            <form onSubmit={handleContact}>
                <div className="form-group">
                    <input type="text" className="form-control form-control-lg mb-1" placeholder='Name ...' onChange={e => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="tel" pattern="[0-9]{4} [0-9]{3} [0-9]{4}" className="form-control form-control-lg mb-3" placeholder='Phone...1234 567 8900' onChange={e => setPhone(e.target.value)} />
                </div>
              
                <button type="submit" className="btn btn-primary btn-lg text-uppercase mb-3">Add</button>

            </form>

        </div>
    )
}

export default Form