import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Item} from '../../types';

export const fetchItems = createAsyncThunk<Item[]>(
  'items/fetchAllItems',
  async () => {
    const {data: items} = await axiosApi.get<Item[]>('items');
    return items;
  });