const mongoose = require('mongoose');

// Correcting the mistake: use `mongoose.Schema()` instead of `mongoose.userSchema()`
const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

// Export the model
module.exports = mongoose.model('user', userSchema);
