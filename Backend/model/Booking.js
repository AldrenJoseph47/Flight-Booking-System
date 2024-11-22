const mongoose = require('mongoose');

// Booking Schema
const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
    passenger: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Passenger' }],
    discountType: { type: String, enum: ['None', 'Student', 'Senior Citizen', 'Disabled', 'Army'], default: 'None' }, // New discount field
    totalPrice: { type: Number, required: true },
    bookingDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Paid', 'Pending'], default: 'Pending' }
    
});

module.exports = mongoose.model('Booking', bookingSchema);
