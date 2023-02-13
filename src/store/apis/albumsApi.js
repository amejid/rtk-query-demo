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
          return [{ type: "Album", id: userId }];
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
          return [{ type: "Album", id: userId }];
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
    };
  },
});

export const { useAddAlbumMutation, useFetchAlbumsQuery } = albumsApi;
export { albumsApi };
