const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sql = require('./database/databaseConnect');
const searchPeopleRoutes = require('./routes/search-people');
const categorySearchRoutes = require('./routes/category-search');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', '*');
        return res.json({});
    }
    next();
});


app.use('/search-people', searchPeopleRoutes);
app.use('/category-search', categorySearchRoutes);

app.use('/', (req, res, next) => {
    res.status(200).json({
        proba: "proba"
    });
});
module.exports = app;