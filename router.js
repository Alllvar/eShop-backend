const express = require('express');
const mongoose = require('mongoose');
const qs = require('qs');

const Product = require('./schema/product');
const Category = require('./schema/category');
const Review = require('./schema/review');

const router = express.Router({ mergeParams: true });  

router.get('/products', async (req, res) => {
    const query = {};
    const reqQuery = qs.parse(req.query);

    if(reqQuery.categoryId && Array.isArray(reqQuery.categoryId)) {
        query.categoryId = {
            $in: reqQuery.categoryId.map(id => mongoose.mongo.ObjectId(id))
        }
    }
    console.log(reqQuery.limit, reqQuery.skip, query)
    const result = await Product
        .find(query)
        .limit( parseInt(reqQuery.limit, 10) )
        .skip(parseInt(reqQuery.skip, 10));

    return res.json(result);
});

router.get('/products/:id', async (req, res) => {
    const result = await Product.findOne( { _id: mongoose.mongo.ObjectId(req.params.id) });

    return res.json({result})
}) ;

router.get('/categories', async (req, res) => {
    const query = req.query || {};
    const result = await Category.find(query);
    console.log(req.query, '==================')
    res.json(result);
});

router.get('/products/:id/reviews', async (req, res) => {
    const result = await Review.findOne( { productId: mongoose.mongo.ObjectId(req.params.id) });

    return res.json(result)
});

module.exports = router;