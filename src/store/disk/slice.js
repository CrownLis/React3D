import { getDownloadLinkAction, getModelsListAction } from './asyncAction';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  downloadLink: null,
  list: [],
  loading: false,
  error:''
};


const diskSlice = createSlice({
  name: 'disk',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getDownloadLinkAction.pending, (state) => {
        (state.loading = true)
      })
      .addCase(getDownloadLinkAction.fulfilled, (state, action) => {
        (state.loading = false), (state.downloadLink = action.payload)
      })
      .addCase(getDownloadLinkAction.rejected, (state) => {
        (state.loading = false), (state.error = 'error')
      })
      .addCase(getModelsListAction.pending, (state) => {
        (state.loading = true)
      })
      .addCase(getModelsListAction.fulfilled, (state, action) => {
        (state.loading = false), (state.list = action.payload)
      })
      .addCase(getModelsListAction.rejected, (state) => {
        (state.loading = false), (state.error = 'error')
      })
  }
});

export default diskSlice.reducer