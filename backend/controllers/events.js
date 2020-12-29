const Events = require('../models/events');

const getEvents = (req, res) => {
    Events.find()
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.log(error)
        })
};

const postEvents = (req, res) => {
    const event = new Events(req.body);
    event.save()
        .then(result => res.json(result))
        .catch(error => console.log(error))
};

module.exports = {
    getEvents,
    postEvents
};
