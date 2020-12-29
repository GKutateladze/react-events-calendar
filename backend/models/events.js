const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Events = mongoose.model('events', EventsSchema);
module.exports = Events;
