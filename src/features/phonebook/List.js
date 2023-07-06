import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './listSlice';
import axios from 'axios'
import { toast } from 'react-toastify';


function List() {
    const contacts = useSelector((state) => state.contacts.data); // store daki veriye erişim sağladı
    const [filteredText, setFilteredText] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchData()); // component mount olduğunda datayı fetch edecek
    }, [dispatch]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/contact/${id}`) 
            toast.error(`${contacts.find(contact=>contact._id===id).name} deleted`, { theme: 'colored' });
            dispatch(fetchData())
            navigate('/');
        }
        catch (error) {
            console.error('Kişi silinirken bir hata oluştu', error)
        }
    };


    return (
        <div className="container w-100 vh-25">
            <h1 className="mb-5 text-white text-center">PHONE BOOK</h1>
            <Link to={'/create'} type="button" className="btn btn-success btn-lg text-uppercase mb-3">
                Add New +
            </Link>
            <input type="text" className="form-control form-control-lg mb-3" placeholder='Filter By Name or Phone...' onChange={(e => setFilteredText(e.target.value))} />
            <table className="table table-striped table-hover table-bordered overflow-auto">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th className="w-25">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.filter((contact) => {// filter methodu ile inputa girilen değere göre tabloyu filtreleyip map ile değerleri döndürdük
                        return ((filteredText.toLowerCase() === '' ? contact : contact.name.toLowerCase().includes(filteredText)) ||
                            (filteredText.toLowerCase() === '' ? contact : contact.phone.toLowerCase().includes(filteredText)))
                    }).map((contact) => (
                        <tr key={contact._id}>
                            <td>{contact.id}</td>
                            <td>{contact.name}</td>
                            <td>{contact.phone}</td>
                            <td className="d-flex justify-content-evenly">
                                <Link to={`/edit/${contact._id}`} className="btn btn-primary btn-sm">
                                    Edit
                                </Link>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(contact._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default List;




