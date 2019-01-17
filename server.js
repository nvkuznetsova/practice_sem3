const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const router = require('./routes/list');
const PORT = process.env.port || 7777;
const app = express();
const protocol = 'http://' || 'https://';
const URL = 'young-mountain-79735.herokuapp.com/' || 'localhost';

const dbURL = 'mongodb://dbuser:gollum123@ds255754.mlab.com:55754/todoapp';
mongoose.connect(dbURL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app
    .use(cors({
      origin: `${protocol}${URL}:3000`,
      credentials: true
    }))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .engine('html', require('ejs').renderFile)
    .use(express.static(path.join(__dirname, './client')))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use('/api/tasks', router)

    .listen(PORT, () => console.log(`Listening on port ${PORT}`))
