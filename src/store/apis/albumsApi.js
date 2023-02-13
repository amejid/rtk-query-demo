import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  endpoints(build) {
    return {
      fetchAlbums: build.query({
        query(userId) {
          return {
            url: "/albums",
            params: {
              userId: userId,
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchAlbumsQuery } = albumsApi;
export { albumsApi };
