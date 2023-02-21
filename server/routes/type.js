const express = require('express');
const { Type } = require('../models/Type');
const router = express.Router();

router.get('/getTypes', (req, res) => {
    Type.find({ }, { '_id': 0 ,'name': 1, 'index': 1 })
        .exec((err, types) => {
            if(err) return res.status(400).json({ getTypesSuccess: false, err });

            return res.status(200).json({ getTypesSuccess: true, types });
        })
});

module.exports = router;