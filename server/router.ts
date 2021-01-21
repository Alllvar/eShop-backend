import express, { Router, Request, Response } from 'express';
import mongoose, { MongooseFilterQuery as MongoQuery } from 'mongoose';
import Product from './schema/product';
import Category from './schema/category';
import Review from './schema/review';
import { IProduct } from './types/product';
import { ICategory } from './types/category';
import { IReview } from './types/review';

const router: Router = express.Router({ mergeParams: true });

router.get('/products', async (request: Request, response: Response) => {
  const query: MongoQuery<IProduct> = {};
  const reqQuery = request.query;
  const { categoryId, limit, skip } = reqQuery;

  if (categoryId && Array.isArray(categoryId)) {
    query.categoryId = {
      $in: (categoryId as string[]).map((id: string) => new mongoose.mongo.ObjectId(id))
    };
  }

  const result = await Product
    .find(query)
    .limit(parseInt(limit as string, 10))
    .skip(parseInt(skip as string, 10));

  return response.json(result);
});

router.get('/products/count', async (request: Request, response: Response) => {
  const query: MongoQuery<IProduct> = {};
  const reqQuery = request.query;
  const { categoryId } = reqQuery;

  if (reqQuery.categoryId && Array.isArray(reqQuery.categoryId)) {
    query.categoryId = {
      $in: (categoryId as string[]).map((id: string) => new mongoose.mongo.ObjectId(id))
    };
  }

  const result = await Product.countDocuments(query);

  return response.json(result);
});

router.get('/products/:id', async (request: Request, response: Response) => {
  const query: MongoQuery<IProduct> = { _id: new mongoose.mongo.ObjectId(request.params.id) };
  const result = await Product.findOne(query);

  return response.json(result);
});

router.get('/products/:id/reviews', async (request: Request, response: Response) => {
  const query: MongoQuery<IReview> = { productId: new mongoose.mongo.ObjectId(request.params.id) };
  const result = await Review.findOne(query);

  return response.json(result);
});

router.get('/categories', async (request: Request, response: Response) => {
  const query: MongoQuery<ICategory> = request.query;
  const result = await Category.find(query);

  return response.json(result);
});

export default router;
