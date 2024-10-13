import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const adapter = createEntityAdapter({
  selectId: resource => resource.resource_id,
});

export const resourcesSlice = createSlice({
  name: 'resources',
  initialState: adapter.getInitialState(),
  reducers: create => ({
    addReference: create.reducer((state, action) => {
      adapter.addOne(state, action.payload);
    }),
    addReferences: create.reducer((state, action) => {
      adapter.addMany(state, action.payload);
    }),
    removeReference: create.reducer((state, action) => {
      adapter.removeOne(state, action.payload);
    }),
    removeReferences: create.reducer((state, action) => {
      adapter.removeMany(state, action.payload);
    }),
  }),
});

export const { reducer: resourcesReducer, actions: resourcesActions } = resourcesSlice;

export const resourcesSelectors = adapter.getSelectors();
