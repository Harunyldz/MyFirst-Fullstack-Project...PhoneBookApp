import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateContact } from './listSlice'
import axios from 'axios'
import { toast } from 'react-toastify';


function Edit() {
    const { id } = useParams(); //
    const contacts = useSelector((state) => state.contacts.data);
    const contactToEdit = contacts.find((contact) => contact._id === id);

    const [updatedName, setUpdatedName] = useState('');
    const [updatedPhone, setUpdatedPhone] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/contact/${id}`);
                const { name, phone } = response.data.data;
                setUpdatedName(name);
                setUpdatedPhone(phone);
            } catch (error) {
                console.error('Kişi görüntülenirken bir hata oluştu!', error);
            }
        };

        fetchContact();
    }, [id]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:5000/contact/${id}`, {
                name: updatedName.toLocaleUpperCase(),
                phone: updatedPhone,
            });
            // dispatch(updateContact({ name: updatedName, phone: updatedPhone, _id: id}));
            toast.info(`${updatedName.toLocaleUpperCase()} updated `, {
                theme: 'colored',
              });
            navigate('/');
        } catch (error) {
            console.error('Kişi güncellenirken bir hata oluştu!', error);
        }
    };

    if (!contactToEdit) {
        return <div>Contact not found.</div>;
    }



    return (
        <div className='w-50 p-3'>
            <h2 className='mb-5 text-center text-white display-5'>Update Contact</h2>
            <form onSubmit={handleUpdate}>
                <div className="form-group">
                    <input type="text" className="form-control form-control-lg mb-1"  value={updatedName} onChange={e => setUpdatedName(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="tel" pattern="[0-9]{4} [0-9]{3} [0-9]{4}"  className="form-control form-control-lg mb-3" value={updatedPhone} onChange={e => setUpdatedPhone(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary btn-lg text-uppercase mb-3">Update</button>
            </form>

        </div>
    )
}

export default Edit