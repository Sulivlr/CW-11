import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Item, ItemMutation} from '../../types';
import {RootState} from '../../app/store';

export const fetchItems = createAsyncThunk<Item[]>(
  'items/fetchAllItems',
  async () => {
    const {data: items} = await axiosApi.get<Item[]>('items');
    return items;
  });

export const createItem = createAsyncThunk<void, ItemMutation, { state: RootState }>(
  'items/create',
  async (itemMutation, { getState }) => {
    const token = getState().users.user?.token;

    if (!itemMutation.image) {
      return console.error('No image provided');
    }

    const formData = new FormData();
    const keys = Object.keys(itemMutation) as (keyof typeof itemMutation)[];
    keys.forEach(key => {
      const value = itemMutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    })
    await axiosApi.post('/items', formData, { headers: { 'Authorization': token } });
  }
);


export const fetchOneItem = createAsyncThunk<Item, string>(
  'items/fetchOne',
  async (id) => {
    const {data: item} = await axiosApi.get<Item>(`items/${id}`);
    return item;
  }
)