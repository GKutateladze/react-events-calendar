const Events = require('../models/events');

const getEvents = (req, res) => {
    Events.find()
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.log(error)
        })
}

module.exports = {
    getEvents
}
