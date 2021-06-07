const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    id: String,
    type: String,
    destinationId: String,
    content: {},
});

module.exports = mongoose.model('Notification', notificationSchema);