const express  = require('express');
const router   = express.Router();
const { User } = require('../models/User');
const { Book } = require('../models/Book');
const { auth } = require('../middleware/auth');
const dayjs = require('dayjs');
const { Payment } = require('../models/Payment');
dayjs.locale('ko');
const async = require('async');

router.get('/auth', auth, (req, res) => {
    // auth가 잘 넘어 올 때 실행되는 로직이다
    const { _id, email, name, lastname, role, image, favorites, history } = req.user;

    res.status(200).json({ 
        isAdmin: role === 0 ? false : true,
        isAuth: true,
        _id: _id, 
        email: email,
        name: name,
        lastname: lastname,
        role: role,
        image: image,
        favorites: favorites,
        history: history,
    });
});



router.post('/register', (req, res) => {
    // 회원가입할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다
    const user = new User(req.body);
    
    // mongodb에서 선언된 함수 save이다. 저장되기 전에 유저 정보의 암호화가 진행되어야 한다
    user.save((err, data) => {
        if(err) {
            return res.json({ registerSuccess: false, err });
        }

        return res.status(200).json({
            registerSuccess: true,
        }); 
    });
});


router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // 요청된 이메일을 데이터베이스에서 있는지 검사한다. findOne은 mongoDB에서 제공하는 메소드이다
    User.findOne({ email: email }, (err, user) => {
        if(!user){            
            return res.json({
                loginSuccess: false,
                message: '제공된 이메일에 해당하는 유저가 없습니다.',
            });
        }

        // 요청된 이메일이 데이터베이스에 있다면 비밀번호까지 일치하는 지 확인한다
        user.comparePassword(password, (err, isMatch) => {
        //  if(err) return res.status(400).json({ loginSuccess: false, message: err });
            if(!isMatch){
                return res.json({ 
                    loginSuccess: false,
                    message: '비밀번호가 틀렸습니다.' 
                });
            }

            // 비밀번호까지 맞다면 쿠키에 쓰일 용도인 토큰을 생성한다
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                if(user){
                    res.cookie('x_auth', user.token)
                     .status(200)
                     .json({
                        loginSuccess: true,
                        userId: user._id,
                    });
                }
            });
        });
    });   
});


// 로그인된 상태이기 때문에 auth를 넣어준다
router.get('/logout', auth, (req, res) => {
    const { _id } = req.user;

    // 첫번째 인자는 찾으려는 것, 두번 째 인자는 업데이트 내용
    User.findOneAndUpdate({ _id: _id }, { token: '' }, (err, user) => {
        if(err) res.json({ logoutSuccess: false, err });       
        
        return res.status(200).json({
            logoutSuccess: true,
        });
    });
});


// 카트 기능
router.get('/addToFavorites', auth, (req, res) => {
    User.findOne({ _id: req.user._id }, (err, userInfo) => {
        
        let finds = userInfo.favorites.filter((favorite) => favorite.id === req.query.bookId);
        // 중복이 있으면 ?
        if (finds.length > 0) {           
            User.findOneAndUpdate({ _id: req.user._id, 'favorites.id': req.query.bookId },
                                  { $inc: { 'favorites.$.quantity': 1 } },
                                  { new: true },
                                  (err, userInfo) => {
                                    if (err) return res.status(400).json({ success: false, err });

                                    return res.status(200).json(userInfo.favorites);
                                  });
        } else {            
            User.findOneAndUpdate({ _id: req.user._id }, 
                                   { $push: { favorites: { id: req.query.bookId, quantity: 1, date: dayjs(new Date()).format('YYYY / MM / DD / ddd | HH:mm:ss') } } },
                                   { new: true },
                                   (err, userInfo) => {
                                       if (err) return res.json({ success: false, err });
                                       
                                       return res.status(200).json(userInfo.favorites);
                                   });
        }
    });
});


router.get('/removeFavoriteBook', auth, (req, res) => {
    const { bookId } = req.query;
    
    User.findOneAndUpdate(
        { _id: req.user._id }, 
        { 
            // $pull은 배열에서 만족하는 특정 연산자를 꺼낸다
            '$pull': {
                'favorites': {
                    id: bookId,
                }
            }
        },
        { new: true },
        (err, userInfo) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ removeFavoriteBook: false, err })
            }

            let { favorites } = userInfo;
            let idArray = favorites.map((book) => book.id);
            
            Book.find({ _id: { $in: idArray } })
                .populate('writer')
                .exec((err, detailFavorites) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json({ removeFavoriteBook: false, err });
                    }

                    return res.status(200).json({ removeFavoriteBook: true, detailFavorites, favorites })
                });              
        });
});


router.post('/paymentSuc', auth, (req, res) => {
    let history = [];
    let transactionData = {};
    let now = dayjs(new Date()).format('YYYY / MM / DD / ddd | HH:mm:ss');

    const { detailFavorites, paymentData } = req.body;
 
    [...detailFavorites].map((detailBook, i) => {
        let info = {
            id: detailBook._id,
            title: detailBook.title,
            price: detailBook.price,
            quantity: detailBook.quantity,
            dateOfPayment: now,
        };

        history = [...history, info];
    });

    // paymentUser: {
    //     id: paymentData.paymentID,
    //     email: paymentData.email,
    //     dateOfPayment: dayjs(new Date()).format('YYYY / MM / DD / ddd | HH:mm:ss'),
    //     paid: paymentData.paid
    // }     

    transactionData = {
        user: {
            id: req.user._id,
            name: req.user.name,
            lastname: req.user.lastname,
            email: req.user.email,
        },
        paymentInfos: {
            paid: paymentData.paid,
            cancled: paymentData.cancled,
            email: paymentData.email,
            payerID: paymentData.payerID,
            paymentID: paymentData.paymentID,
            dateOfPayment: now,
        },
        book: history
    };  
   
    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: 
            { history: history },
            $set: { favorites: [] }
        },
        { new: true },
        (err, user) => {
            if (err) return res.status(400).json({ suc: false, err });

            const payment = new Payment(transactionData);
            payment.save((err, data) => {
                if (err) return res.status(400).json({ suc: false, err });

                let books = [];
                data.book.map(item => {
                    books = [...books, { 
                        id: item.id, 
                        quantity: item.quantity  
                    }];
                });

                // 비동기를 동기처리하기 위한 로직
                async.eachSeries(books, (item, cb) => {
                    Book.updateMany(
                        { _id: item.id },
                        { $inc: {
                            'sold': Number(item.quantity)
                        }},
                        { new: false }
                        , (err) => {
                            if (err) return res.json({ suc: false, err });
                            
                            // 구매가 끝나면 모두 빈값으로 처리
                            return res.status(200).json({ suc: true, favorites: [], detailFavorites: [] });
                        }
                    );
                });
            });
        }
    );   
});


// 위에것은 카트 기능 구현 , 다 마치면 아래로 전환하기
// router.post('/addToFavorites', auth, (req, res) => {

//     const { id, title, price } = req.body;
//     User.findOneAndUpdate({ _id: req.user._id }, 
//                           { $push: { favorites: { id: id, title: title, price: price } } },
//                           (err, userInfo) => {
//                           if (err) return res.status(200).json({ success: false, err });

                    
//                           return res.status(200).json({ success: true });
//     });
// });

// router.post('/getIsFavorite', auth, (req, res) => {
//     User
// });

module.exports = router;