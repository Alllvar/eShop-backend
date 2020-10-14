const express = require('express');
const mongoose = require('mongoose');

const Product = require('./schema/product');
const Category = require('./schema/category');
const Review = require('./schema/review');

const router = express.Router({ mergeParams: true });

router.get('/products', async (req, res) => {
    const query = req.query || {};
    const result = await Product.find(query);

    res.json(result);
});

router.get('/products/:id', async (req, res) => {
    const result = await Product.findOne( { _id: mongoose.mongo.ObjectId(req.params.id) });

    return res.json({result})
}) ;

router.get('/categories', async (req, res) => {
    const query = req.query || {};
    const result = await Category.find(query);

    res.json(result);
});

router.get('/categories/:name', async (req, res) => {
    const category = await Category.findOne( { name: req.params.name });
    const result = await Product.find({ categoryId: category._id });

    return res.json(result)
});

router.get('/products/:id/reviews', async (req, res) => {
    const result = await Review.findOne( { productId: mongoose.mongo.ObjectId(req.params.id) });

    return res.json(result)
});

module.exports = router;