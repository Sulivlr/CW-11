import express from 'express';
import {Item} from '../models/Item';
import auth, {RequestWithUser} from '../middleware/auth';
import {imagesUpload} from '../multer';
import mongoose from 'mongoose';
import {Category} from '../models/Category';

export const itemsRouter = express.Router();

itemsRouter.get('/', async (req, res, next) => {
  try {
    const filter: Record<string, unknown> = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const items = await Item.find(filter);
    res.send(items);
  } catch (error) {
    next(error);
  }
});

itemsRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Item.findById(id)
      .populate('category', 'title')
      .populate('user', 'displayName phoneNumber')
    if (!item) {
      res.status(404).send('Item not Found');
      return;
    }
    res.status(200).send(item);
  } catch (error) {
    next(error);
  }
});

itemsRouter.delete('/:id', auth, async (req, res, next) => {
    const expressReq = req as RequestWithUser;
    const user = expressReq.user;
  try {

    if (!user) {
      res.status(401).send({error: 'Unauthorized'});
      return;
    }

    const id = req.params.id;

    const item = await Item.findById(id);
    if (!item) {
      res.status(404).send('Item not Found');
      return;
    }

    if (!item.user._id.equals(user._id)) {
      res.status(403).send({ error: 'Forbidden' });
    }

  } catch (error) {
    next(error);
  }
});

itemsRouter.post("/", imagesUpload.single('image'), auth,  async (req, res, next) => {
  const expressReq = req as RequestWithUser;
  const user = expressReq.user;
  const categoryId = req.body.category;
  try {
    if (!user) {
      res.status(401).send({error: 'Unauthorized'});
      return;
    }
    const category = await Category.findById({_id: categoryId});

    if (!category) {
      res.status(403).send({error: 'Category not found'});
    }

    const item = new Item({
      user: user._id,
      title: req.body.title,
      description: req.body.description,
      image: req.file ? 'images' + req.file.filename : null,
      price: req.body.price,
      category
    });
    await item.save();
    res.send(item)
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).send({error: error.message});
      return;
    }
    next(error);
  }
});