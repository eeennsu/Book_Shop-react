const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { auth } = require('../middleware/auth');
const { Book } = require('../models/Book');


const storage = multer.diskStorage({
    // 어디에 저장할지
    destination: (req, res, cb) => {
        cb(null, 'server/uploads/');
    },

    // 파일의 이름
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
});

// 필터 
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname);

    if (ext === '.jpg' || ext === '.png') return cb(null, true);

    cb(new Error('I don\'t have a clue!'));    
};

const upload = multer({ storage: storage, fileFilter: fileFilter}).single('file');


router.post('/getBooks', (req, res) => {

    let { body } = req;
    let sortBy = body.sortBy || '_id';
    let order = body.order || 'desc';    
    let limit = Number(body.limit) || 100;
    let skip = Number(body.skip);

    let findArgs = {};
    let keyword = body.searchKeyword;

    if (body.filters) {
        for (let key in body.filters) {
            // 필터값이 존재한다면
            if (body.filters[key].length > 0) {
                // 필터가 가격이면
                if (key === 'price') {
                    findArgs[key] = {
                        $gte: body.filters[key][0],         // greater than equal
                        $lte: body.filters[key][1]          // less than equal
                    };
                } else {        // 필터가 책의 타입이면
                    findArgs[key] = body.filters[key];
                }
            }
        }   
    }   

    // 필터를 넣어준다
    if (keyword) {
        Book.find(findArgs)
            .populate('writer')
            .find({ $text: { $search: keyword }  })
            .sort([[sortBy, order]])                 
            .skip(skip)                             // skip 다음부터 출력한다
            .limit(limit)                           // 개수를 제한한다
            .exec((err, books) => {
                if (err) return res.status(400).json({ getBooksSuccess: false, err })

                return res.status(200).json({ getBooksSuccess: true, books, postSize: books.length });
            });
    } else {
        Book.find(findArgs)
            .populate('writer')
            .sort([[sortBy, order]])                 
            .skip(skip)                             // skip 다음부터 출력한다
            .limit(limit)                           // 개수를 제한한다
            .exec((err, books) => {
                if (err) return res.status(400).json({ getBooksSuccess: false, err })
               
                return res.status(200).json({ getBooksSuccess: true, books, postSize: books.length });
            });
    } 
});


router.post('/uploadImage', auth, (req, res) => {
    upload(req, res, (err) => {
        if (err) return res.status(400).json({ uploadSuccess: false, err })

        return res.status(200).json({ uploadSuccess: true, imageFilePath: res.req.file.path, fileName: res.req.file.filename });
    });
});


router.post('/uploadBook', auth, (req, res) => {
    const book = new Book(req.body);
    book.save((err) => {
        if (err) return res.status(400).json({ saveBookSuccess: false, err });

        return res.status(200).json({ saveBookSuccess: true });
    });
});


router.get('/getDetailBook', auth, (req, res) => {
    let { bookId, kind } = req.query;
                                                    
    if (kind === 'array') {               
        let stringToArray = bookId.split(',');
        bookId = stringToArray.map((id) => id);
    }  

    Book.find({ '_id': { $in: bookId } })
        .populate('writer')
        .exec((err, book) => {
            if (err) return res.status(400).json({ getBookSuccess: false });
            
            book = kind === 'array' ? book : book[0]; 
            res.status(200).json({ getBookSuccess: true, book });

            if (kind !== 'array') {               
                Book.findOneAndUpdate({ '_id': bookId }, { 'views': book.views + 1 })
                .exec((err, result) => {
                    if (err) console.log(err);
                }); 
            }                          
    });
});




module.exports = router;