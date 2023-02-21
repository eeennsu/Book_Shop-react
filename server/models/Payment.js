const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = mongoose.Schema({
    user: {
        type: Array,
        default: []
    },
    paymentInfos: {
        type: Array,
        default: []
    },
    book: {
        type: Array,
        default: []
    }
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = { Payment };