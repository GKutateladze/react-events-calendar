const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventsSchema = new Schema({
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
});

const Events = mongoose.model('Events', eventsSchema);
module.exports = Events;
