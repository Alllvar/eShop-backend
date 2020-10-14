const { model, Schema } = require('mongoose');

const schema = Schema({ name : String });

module.exports = model('Category', schema);