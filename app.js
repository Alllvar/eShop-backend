const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/', require('./router'));

app.listen(8081, async () => {
    console.log('Example app listening at 8081');
    await mongoose.connect('mongodb://localhost/eshop', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('connected to db');
});