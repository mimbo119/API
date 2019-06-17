const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

const getTokenRoute = require('./api/getToken');
const insertRoute = require('./api/insert');
const updateRoute = require('./api/update');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/getToken', getTokenRoute);
app.use('/insert', insertRoute);
app.use('/update', updateRoute);

app.use(function (req, res, next) {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use(function (error, req, res, next) {
    res.status(error.status || 500);
    res.json({
        error: {
            msg: error.message
        }
    })
})

const server = http.createServer(app);
server.listen(port);

module.exports = app;
