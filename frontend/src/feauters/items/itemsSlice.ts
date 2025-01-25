import {Item} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {createItem, fetchItems, fetchOneItem} from './itemsThunks';

export interface ItemsState {
  items: Item[];
  itemsFetching: boolean;
  isCreating: boolean;
  item: Item | null;
  oneFetching: boolean;
}

const initialState: ItemsState = {
  items: [],
  itemsFetching: false,
  isCreating: false,
  item: null,
  oneFetching: false,
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
    builder.addCase(fetchOneItem.pending, (state) => {
      state.item = null;
      state.oneFetching = true;
    }).addCase(fetchOneItem.fulfilled, (state, {payload: item}) => {
      state.item = item;
      state.oneFetching = false
    }).addCase(fetchOneItem.rejected, (state) => {
      state.oneFetching = false;
    })
  },
  selectors: {
    selectItems: (state) => state.items,
    selectItemsFetching: (state) => state.itemsFetching,
    selectItemCreating: (state) => state.isCreating,
    selectOneItem: (state) => state.item,
    selectOneItemFetching: (state) => state.oneFetching,
  }
});

export const itemsReducer = itemsSlice.reducer;
export const {
  selectItems,
  selectItemsFetching,
  selectItemCreating,
  selectOneItem,
  selectOneItemFetching,
} = itemsSlice.selectors;
