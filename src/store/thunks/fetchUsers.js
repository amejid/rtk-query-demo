import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const { data } = await axios.get("http://localhost:3005/users");

  return data;
});
