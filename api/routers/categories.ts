import express from 'express';
import {Category} from '../models/Category';
import mongoose from 'mongoose';

export const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    next(error);
  }
});

categoriesRouter.post('/', async (req, res, next) => {
  try {
    const categoryData = {
      title: req.body.title,
      description: req.body.description,
    };

    const category = new Category(categoryData);
    await category.save();
    res.send(category);
  } catch (error) {
    next(error);
  }
});