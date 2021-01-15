import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IProduct extends Document {
    name : string,
    type : string,
    description : string,
    price : number,
    categoryId : ObjectId,
    image : string
}