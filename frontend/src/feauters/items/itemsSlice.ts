import {Item} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchItems} from './itemsThunks';

export interface ItemsState {
  items: Item[];
  itemsFetching: boolean;
}

const initialState: ItemsState = {
  items: [],
  itemsFetching: false,
}

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.itemsFetching = true;
    }).addCase(fetchItems.fulfilled, (state, {payload: items}) => {
      state.itemsFetching = false;
      state.items = items;
    }).addCase(fetchItems.rejected, (state) => {
      state.itemsFetching = false;
    });
  },
  selectors: {
    selectItems: (state) => state.items,
    selectItemsFetching: (state) => state.itemsFetching,
  }
});

export const itemsReducer = itemsSlice.reducer;
export const {
  selectItems,
  selectItemsFetching
} = itemsSlice.selectors;
