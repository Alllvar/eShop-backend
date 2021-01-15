import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IReview extends Document {
    title : string,
    description : string,
    evaluation : number,
    date : string,
    productId : ObjectId
}