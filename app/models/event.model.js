const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    eventName: String,
    startDate: String,
    endDate: String,
    startTime: String,
    endTime: String,
    type: String,
    description: String
});

module.exports = mongoose.model('Event', EventSchema);