const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { mongoURI, dbName } = require('./config/key');
const cookieParser = require('cookie-parser');
const { USER_SERVER, BOOK, TYPE } = require('../client/src/components/Config');
const cors = require('cors');


app.use('/server', express.static('server'));
app.use(bodyParser.urlencoded({ extended: true }));                    // application/x-www-form-urlencoded를 분석해서 가져와준다
app.use(bodyParser.json());                                            // json타입으로 된 것을 분석해서 가져올 수 있게 해준다
app.use(cookieParser());
app.use(express.json());
app.use(cors());


mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: dbName
    // useCreateIndex: true,
    // useFindAndModify: false,
}).then(() => console.log('MongoDB is connected!!')).catch((e) => console.log(e));


app.use(USER_SERVER, require('./routes/users'));
app.use(BOOK, require('./routes/book'));
app.use(TYPE, require('./routes/type'));

app.listen(PORT, () => {
    console.log(`Server is connected at ${PORT} port!!`);
});