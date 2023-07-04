const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    addtime: { type: Date, default: Date.now }
})

const ContactModel = mongoose.model('Contact', contactSchema);

module.exports = ContactModel;