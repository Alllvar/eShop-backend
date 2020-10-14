const { model, Schema } = require('mongoose');

const schema = Schema({
    name : String,
    type : String,
    description : String,
    price : Number,
    image : String
});

module.exports = model('Product', schema);