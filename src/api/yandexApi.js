import axios from 'axios';

export const yandexAxiosInstance = axios.create({
  baseURL: 'https://cloud-api.yandex.net/v1/',
});

yandexAxiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');

    if (token) {
      config.headers['Authorization'] = `OAuth ${JSON.parse(token)}`;
    }

    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

yandexAxiosInstance.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;

    if (response.status === 401) {
      window.location.href =
        'https://oauth.yandex.ru/authorize?response_type=token&client_id=eacca3682f374561b43cfc4991784ea7';
    }

    return Promise.reject(error);
  },
);

export const getFolderResources = async path => {
  return await yandexApi.get(`/disk/resources/`, {
    params: {
      path: path,
    },
  });
};

export const getDownloadLink = async path => {
  console.log('PATH', path);
  return await yandexApi.get(`/disk/resources/download`, {
    params: {
      path: path,
    },
  });
};
