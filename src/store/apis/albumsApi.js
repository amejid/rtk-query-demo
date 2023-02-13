import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  endpoints(build) {
    return {
      addAlbum: build.mutation({
        invalidatesTags(result, error, userId) {
          return [{ type: "UsersAlbums", id: userId }];
        },
        query(userId) {
          return {
            url: "/albums",
            method: "POST",
            body: {
              userId,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      fetchAlbums: build.query({
        providesTags(result, error, userId) {
          const tags = result.map((album) => {
            return { type: "Album", id: album.id };
          });
          tags.push({ type: "UsersAlbums", id: userId });
          return tags;
        },
        query(userId) {
          return {
            url: "/albums",
            params: {
              userId,
            },
            method: "GET",
          };
        },
      }),
      deleteAlbum: build.mutation({
        invalidatesTags(result, error, albumId) {
          return [{ type: "Album", id: albumId }];
        },
        query(albumId) {
          return {
            url: `/albums/${albumId}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useAddAlbumMutation,
  useFetchAlbumsQuery,
  useDeleteAlbumMutation,
} = albumsApi;
export { albumsApi };
