import { createApi } from '@reduxjs/toolkit/query/react';

import { yandexAxiosInstance } from '../../api/yandexApi';

const yandexAxiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await yandexAxiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const yandexApi = createApi({
  reducerPath: 'yandexApi',
  baseQuery: yandexAxiosBaseQuery({
    baseUrl: 'https://cloud-api.yandex.net/v1',
  }),
  endpoints: builder => ({
    getResources: builder.query({
      query: arg => {
        const { path } = arg;

        return {
          url: `/disk/resources`,
          params: { path },
        };
      },
      transformResponse: response => response['_embedded'].items,
    }),
    getResourceLink: builder.query({
      query: arg => {
        const { path } = arg;

        return {
          url: `/disk/resources/download`,
          params: { path },
        };
      },
    }),
  }),
});

export const { useGetResourcesQuery, useGetResourceLinkQuery } = yandexApi;
