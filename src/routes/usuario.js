const express = require('express');
const router = express.Router();


router.get('/add', (req, res) => {
    res.render('usuario/add')
});

router.post('/add', (req, res) => {
    res.send('received')
});

const pool = require ('../database')
module.exports = router; 