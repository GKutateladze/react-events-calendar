const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { getEvents } = require('./controllers/events');

const app = express();

const dbURI = 'mongodb+srv://george:test12345@eventscalendar.85svm.mongodb.net/events?retryWrites=true&w=majority';
const PORT = process.env.PORT || 4000;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
    })
    .catch(error => console.log(error));

app.get('/events', getEvents)

app.use(cors());
