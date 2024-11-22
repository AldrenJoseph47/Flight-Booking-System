const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String },
    idName:{type: String,required: true },
    idNumber:{type: String,required: true},
    seatClass: { type: String, enum: ['Economy', 'Business', 'First'], required: true },
    food: { type: String, enum: ['Yes','No'], required: true }
});

module.exports = mongoose.model('Passenger', passengerSchema);
