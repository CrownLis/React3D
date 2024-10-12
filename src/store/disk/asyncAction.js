import { getDownloadLink, getFolderResources } from './../../api/yandexApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getInfoAboutFolderAction = createAsyncThunk('disk/getInfoAboutFolder', async (path) => {
    const response = await getFolderResources(path);
    const data = response.data;
    console.log(data);
    const items = data['_embedded'].items.map(item => {return {
      name: item.name,
      type: item.type,
    }
    });
    console.log(items);
    return items;
  });

  export const getDownloadLinkAction = createAsyncThunk('disk/getDownloadLink', async (id) => {
    console.log(id);
    const response = await getDownloadLink(id);
    const { href: data} = response.data;
    return data;
  });