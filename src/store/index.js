import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import { albumsApi } from "./apis/albumsApi.js";
import { setupListeners } from "@reduxjs/toolkit/query";
import { photosApi } from "./apis/photosApi.js";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware);
  },
});

setupListeners(store.dispatch);

export * from "./thunks/fetchUsers";
export * from "./thunks/addUser";
export * from "./thunks/deleteUser";
export {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useDeleteAlbumMutation,
} from "./apis/albumsApi";
export {
  useAddPhotoMutation,
  useFetchPhotosQuery,
  useDeletePhotoMutation,
} from "./apis/photosApi";
