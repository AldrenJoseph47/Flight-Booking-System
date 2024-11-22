const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    role: { type: String, required: true, unique: true } // e.g., Customer, Service Provider
});

module.exports = mongoose.model('Role', roleSchema);
