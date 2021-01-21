import { model, Schema, mongo } from 'mongoose';

const schema = new Schema({
    title: String,
    description: String,
    evaluation: Number,
    date: Date,
    productId: mongo.ObjectId
}, { collection: 'review' });

export default model('Review', schema);
