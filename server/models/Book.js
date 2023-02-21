const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 60,
        default: 'book title'
    },
    description: {
        type: String,
        maxlength: 300,
        default: 'book description'
    },
    price: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        default: 0
    },
    images: {
        type: Array,  
        default: []
    },
    sold: {
        type: Number,
        default: 0
    },
    views: {                                             // 조회수
        type: Number,
        default: 0
    },
}, { timestamps: true });

bookSchema.index({
    title: 'text',
    description: 'text'
}, { 
    weights: {
        name: 5,
        description: 1
    }
 });

const Book = mongoose.model('Book', bookSchema);

module.exports = { Book };