const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', '*');
        return res.json({});
    }
    next();
});

app.use('/', (req, res, next) => {
    res.status(200).json({
        proba: "proba"
    });
});
module.exports = app;