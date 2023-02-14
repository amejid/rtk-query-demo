import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  endpoints(build) {
    return {
      addPhoto: build.mutation({
        invalidatesTags(result, error, albumId) {
          return [{ type: "AlbumsPhotos", id: albumId }];
        },
        query(albumId) {
          return {
            url: "/photos",
            method: "POST",
            body: {
              albumId,
              url: faker.image.abstract(150, 150, true),
            },
          };
        },
      }),
      fetchPhotos: build.query({
        providesTags(result, error, albumId) {
          const tags = result.map((photo) => {
            return { type: "Photo", id: photo.id };
          });
          tags.push({ type: "AlbumsPhotos", id: albumId });
          return tags;
        },
        query(albumId) {
          return {
            url: "/photos",
            params: {
              albumId,
            },
            method: "GET",
          };
        },
      }),
      deletePhoto: build.mutation({
        invalidatesTags(result, error, photoId) {
          return [{ type: "Photo", id: photoId }];
        },
        query(photoId) {
          return {
            url: `/photos/${photoId}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useAddPhotoMutation,
  useFetchPhotosQuery,
  useDeletePhotoMutation,
} = photosApi;
export { photosApi };
