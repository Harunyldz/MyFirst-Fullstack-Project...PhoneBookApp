const express = require('express');
const ContactModel=require('../models/contactModel')
const router = express.Router();


router.get('/', function (req, res, next) {
    const query = ContactModel.find({});
    query
        .then((result) => res.json({ message: 'All Contacts', data: result }))
        .catch((err) => res.json({ message: 'Error!', error: err }))
});

router.post('/', function (req, res, next) {
    const newContact = new ContactModel(req.body)
    newContact.save()
        .then((result) => res.json({ message: 'Contact Added', data: result }))
        .catch((err) => res.json({ message: 'Error!', error: err }))

});

router.get('/:id', function (req, res, next) {
    const query = ContactModel.findById(req.params.id); //contact id ile bir kişi getirmek için
    query
        .then((result) => res.json({ message: 'All Contacts', data: result }))
        .catch((err) => res.json({ message: 'Error!', error: err }))
});

router.put('/:id', function (req, res, next) {
    //contactid ile bir kişiyi alıp onu güncellemek için 
    const query = ContactModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    query
        .then((result) => res.json({ message: 'All Contacts', data: result }))
        .catch((err) => res.json({ message: 'Error!', error: err }))
});

router.delete('/:id', function (req, res, next) {
    const query = ContactModel.findByIdAndDelete(req.params.id,{ new: true });
    query
        .then((result) => res.json({ message: 'All Contacts', data: result }))
        .catch((err) => res.json({ message: 'Error!', error: err }))
});

module.exports = router;
