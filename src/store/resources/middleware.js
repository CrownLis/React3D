import { createListenerMiddleware } from '@reduxjs/toolkit';
import { yandexApi } from '../yandex';
import { resourcesActions } from './slice';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: yandexApi.endpoints.getResources.matchFulfilled,
  effect: (action, listenerApi) => {
    listenerApi.dispatch(resourcesActions.addReferences(action.payload));
  },
});

export const { middleware: resourcesMiddleware } = listenerMiddleware;
