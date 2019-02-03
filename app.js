const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const bookRoutes = require('./api/routes/books');
const userRoutes = require('./api/routes/user');

mongoose.connect("mongodb+srv://robertszekely:" + process.env.MONGO_ATLAS_PW + '@node-rest-books-omjs7.mongodb.net/test?retryWrites=true',
    {
        useNewUrlParser: true,
        useCreateIndex: true,
    }
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        req.header('Access-Control-Allow-Method', 'GET, PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

//Routes which handle requests
app.use('/books', bookRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;