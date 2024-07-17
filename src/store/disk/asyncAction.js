import { getDownloadLink, getModelsList } from './../../api/yandexApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getModelsListAction = createAsyncThunk('disk/getModelsList', async () => {
    const response = await getModelsList();
    const data = response.data
    const items = data['_embedded'].items.map(item => item.name);
    return items;
  });

  export const getDownloadLinkAction = createAsyncThunk('disk/getDownloadLink', async (id) => {
    const response = await getDownloadLink(id);
    const { href: data} = response.data;
    return data;
  });