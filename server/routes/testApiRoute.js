const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    console.log('here')
    res.json({name:'api is working properly'});
});

module.exports = router;