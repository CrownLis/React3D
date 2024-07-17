export const getDownloadLinkSelector = (state) => {
  return state.disk.downloadLink
};

export const getModelsListSelector = (state) => {
    return state.disk.list
  };

export const getLoadingSelector = (state) => {
  return state.disk.loading
};