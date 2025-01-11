
const express = require('express');
const log = require('./util/log');
const multer = require('multer');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

const signupRouter = require('./signup');
const verifyRouter = require('./verifyemail')
const loginRouter = require('./login'); 

const app = express();
const upload = multer();

app.use(cors());
app.use(bodyParser.json());
app.use(upload.none());

app.use('/signup',signupRouter);
app.use('/verifymail',verifyRouter);
app.use('/login',loginRouter);


app.listen(2020);