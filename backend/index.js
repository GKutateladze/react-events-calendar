const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getEvents, postEvents, deleteEvents } = require('./controllers/events');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('../build'));


const dbURI = 'mongodb+srv://george:test12345@eventscalendar.85svm.mongodb.net/events?retryWrites=true&w=majority';
const PORT = process.env.PORT || 4000;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
    })
    .catch(error => console.log(error));

app.get('/events', getEvents);

app.post('/events', postEvents);

app.delete('/events', deleteEvents);

app.get('*', (_, res) => {
    res.sendFile(__dirname + '/build/index.html')
})
