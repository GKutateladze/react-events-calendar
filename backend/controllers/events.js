const Events = require('../models/events');

const getEvents = (req, res) => {
    Events.find().then((result) => {
        res.json(result);
    })
}

module.exports = {
    getEvents
}
