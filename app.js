const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const corsOptions = {
    // origin: 'http://localhost:8081',
};

const productSchema = new mongoose.Schema({ 
    name : String,
    type : String,
    description : String,
    price : Number,
    image : String
});

const Product = mongoose.model(
    'Product', 
    productSchema
);

const categorySchema = new mongoose.Schema({ 
    name : String
});

const Сategory = mongoose.model(
    'Category',
    categorySchema
)

const reviewSchema = mongoose.Schema({
    title : String,
    description : String,
    evaluation : Number,
    date : Date,
    productId : mongoose.mongo.ObjectId
}, {collection : "review"})

const Review = mongoose.model(
    'Review',
    reviewSchema
)

app.use(bodyParser.json());
app.use(cors());

app.get('/products', async (req, res) => {
    const query = req.query || {};
    const result = await Product.find(query);

    res.json(result);
});

app.get('/products/:id', async (req, res) => {
  const result = await Product.findOne( { _id: mongoose.mongo.ObjectId(req.params.id) });
  
  return res.json({result})
}) 

app.get('/categories', async (req, res) => {
    const query = req.query || {};
    const result = await Сategory.find(query);

    res.json(result);
});

app.get('/categories/:name', async (req, res) => {
    const category = await Сategory.findOne( { name: req.params.name });
    const result = await Product.find({ categoryId: category._id })

    return res.json(result)
}) 

app.get('/products/:id/reviews', async (req, res) => {
    const result = await Review.findOne( { productId: mongoose.mongo.ObjectId(req.params.id) });
    const result1 = await Review.findOne( { evaluation: 4 });

    return res.json(result1)
}) 

// app.post('/products', async (req, res) => {
//     await Person.create(req.body);
//     res.send('ok');
// });

app.listen(8081, async () => {
    console.log('Example app listening at 8081');
    await mongoose.connect('mongodb://localhost/eshop', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('connected to db');
});

// REST principles

// GET /people - get all people
// POST /people - create person


// GET /people/:id - return concrete person
// PATCH /people/:id - edit concrete person
// DELETE /people/:id - delete concrete person