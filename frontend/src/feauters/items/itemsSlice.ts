import {Item} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {createItem, fetchItems} from './itemsThunks';

export interface ItemsState {
  items: Item[];
  itemsFetching: boolean;
  isCreating: boolean;
}

const initialState: ItemsState = {
  items: [],
  itemsFetching: false,
  isCreating: false,
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
    }).addCase(createItem.pending, (state) => {
      state.isCreating = true;
    }).addCase(createItem.fulfilled, (state) => {
      state.isCreating = false;
    }).addCase(createItem.rejected, (state) => {
      state.isCreating = false;
    });
  },
  selectors: {
    selectItems: (state) => state.items,
    selectItemsFetching: (state) => state.itemsFetching,
    selectItemCreating: (state) => state.isCreating,
  }
});

export const itemsReducer = itemsSlice.reducer;
export const {
  selectItems,
  selectItemsFetching,
  selectItemCreating,
} = itemsSlice.selectors;
