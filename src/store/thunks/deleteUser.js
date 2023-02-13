import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteUser = createAsyncThunk("users/delete", async (userId) => {
  await axios.delete(`http://localhost:3005/users/${userId}`);

  return userId;
});
