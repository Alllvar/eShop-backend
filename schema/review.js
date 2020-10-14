const { model, mongo, Schema } = require('mongoose');

const schema = Schema({
    title : String,
    description : String,
    evaluation : Number,
    date : Date,
    productId : mongo.ObjectId
}, { collection : 'review' });

module.exports = model('Review', schema);