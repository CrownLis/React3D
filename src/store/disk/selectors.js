export const getDownloadLinkSelector = (state) => {
  return state.disk.downloadLink
};

export const getFolderInfoSelector = (state) => {
    return state.disk.list
  };

export const getLoadingSelector = (state) => {
  return state.disk.loading
};