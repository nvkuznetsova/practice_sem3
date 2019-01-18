const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routes/list');
const port = process.env.PORT || 7777;
const app = express();

const dbURL = 'mongodb://dbuser:gollum123@ds255754.mlab.com:55754/todoapp';
mongoose.connect(dbURL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .engine('html', require('ejs').renderFile)
    .use(express.static(path.join(__dirname, './client/build')))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use('/api/tasks', router)
    .use('*', r =>{
      r.res.sendFile(path.join(__dirname+'/client/build/index.html'));
  })

    .listen(port, () => console.log(`Listening on port ${port}`))
