import mongoose, {Types} from 'mongoose';
import {Category} from './Category';
import User from './User';

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    validate: {
      validator: async function (value: Types.ObjectId) {
        const category = await Category.findById(value);
        return Boolean(category);
      },
      message: 'Category does not exist',
    },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async function (value: Types.ObjectId) {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist',
    },
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: function (value: number) {
        return value > 0;
      },
      message: 'Price must be a positive integer',
    },
  },
});

export const Item = mongoose.model('Item', ItemSchema);