import { model, Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import { IProduct } from '../types/product';

const schema = new Schema({
    name: String,
    type: String,
    description: String,
    price: Number,
    categoryId: ObjectId,
    image: String
});

export default model<IProduct>('Product', schema);
