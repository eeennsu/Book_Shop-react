const mongoose = require('mongoose');

const typeSchema = mongoose.Schema({
    name: {
        type: String,
    },
    index: {
        type: Number,
    }
});

const Type = mongoose.model('Type', typeSchema);

module.exports = { Type };
