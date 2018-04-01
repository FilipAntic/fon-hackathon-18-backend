const express = require('express');
const router = express.Router();
const queries = require('../database/databaseOperation');
const table = 'korisnik';


router.get('/clusters', (req, res, next) => {
    queries.getClusters('korisnik').then(user => {
        res.status(200).json(user);
    });
});

router.get('/devices', (req, res, next) => {
    let start = req.query.start;
    let end = req.query.end;
    queries.getDevices('korisnik', start, end).then(user => {
        res.status(200).json(user);
    });
});

router.get('/predicted', (req, res, next) => {
    queries.getPredicted().then(user => {
        res.status(200).json(user);
    });
});

router.get('/:id?', (req, res, next) => {

    if (req.params.id) {
        queries.getById(table, req.params.id).then(user => {
            res.status(200).json(user);
        });
    } else {
        queries.getAll(table).then(users => {
            res.status(200).json(users);
        });
    }

});

router.post('/', (req, res, next) => {
    let us = req.body;
    if (!((arg = checkIfHasOnlyCharsAndSpaces(us.first_name, us.last_name, us.birth_place, us.driving_license_country)))[0]) {
        res.status(400).json({ mess: "Wrong arguments" });
        return;
    }
    queries.insert(table, req.body).then(user => {
        res.status(200).json(user.insertId);
    });
});

router.delete('/:id', (req, res, next) => {
    queries.delete(table, req.params.id).then(user => {
        res.status(200).json(user);
    });
});

router.put('/:id', (req, res, next) => {
    queries.update(table, req.params.id, req.body).then(user => {
        res.status(200).json(user);
    });
});

function checkIfHasOnlyCharsAndSpaces() {
    for (let i = 0; i < arguments.length; i++) {
        if (!(/^[a-zA-Z ]+$/.test(arguments[i]))) {
            return [false, i];
        }
    }
    return [true, null];
}
module.exports = router;