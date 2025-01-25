import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import {randomUUID} from 'crypto';
import {Category} from './models/Category';
import {Item} from './models/Item';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('categories');
    await db.dropCollection('items');
    await db.dropCollection('users');
  } catch (error) {
    console.log('Skipping drop...');
  }

  const firstUser = await User.create({
    username: 'admin',
    password: 'admin',
    displayName: 'Admin',
    phoneNumber: '0778011001',
    token: randomUUID(),
  });

  const secondUser = await User.create({
    username: 'user',
    password: 'user',
    displayName: 'User',
    phoneNumber: '0777311309',
    token: randomUUID(),
  });

  const [computers, cars, other] = await Category.create(
    {
      title: 'Cars'
    },
    {
      title: 'Computers',
    },
    {
      title: 'Other'
    }
  );

  await Item.create(
    {
      title: 'MacBook Pro M4',
      description: 'The most Performance MacBook ever made',
      image: 'fixtures/macbook.jpg',
      price: 2000,
      category: computers,
      user: firstUser,
    },
    {
      title: 'Audi RS6 Performance ',
      description: 'The most Performance RS6 on the planet',
      image: 'fixtures/audi.jpg',
      price: 2000,
      category: cars,
      user: firstUser
    },
    {
      title: 'MacBook Pro M3',
      description: 'The previous generation of macbooks',
      image: 'fixtures/m3.jpeg',
      price: 1300,
      category: computers,
      user: secondUser,
    },
    {
      title: 'BMW M5 Competition',
      description: 'The fastest sedan ever',
      image: 'fixtures/bmw.jpg',
      price: 132000,
      category: cars,
      user: firstUser,
    },
    {
      title: 'Porsche 911 Turbo S ',
      description: 'The most fastest Porsche on the planet',
      image: 'fixtures/911.webp',
      price: 156000,
      category: cars,
      user: secondUser,
    },
    {
      title: 'IMAC',
      description: 'The only PC that apple Produced',
      image: 'fixtures/imac.webp',
      price: 2500,
      category: computers,
      user: firstUser,
    },
)


  await db.close();
};

void run();