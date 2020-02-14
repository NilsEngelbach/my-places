const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    dotenv = require('dotenv'),
    nocache = require('nocache');

dotenv.load();

const app = express();

// Set up mongoose connection
mongoose.connect(process.env.MONGO_DB_CONNECTIONSTRING, {
    auth: {
        user: process.env.MONGO_DB_USER,
        password: process.env.MONGO_DB_PASSWORD
    },
    useNewUrlParser: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(nocache());

const api = require('./routes/api');

app.use('/api/v1/places', api);

// Serve static files for frontend application
app.use('/', express.static('public'));

app.get('*', function (req, res) {
    res.redirect('/index.html');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    if (err.name == "ValidationError" || err.name == "CastError") {
        res.status(400).send({ error: err.message });
    } else {
        res.status(500).send({ error: err });
    }
});

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
