import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: null,
    friend: null
  },
  reducers: {
    setFriend(state, action) {
      state.friend = action.payload;
    },
  }
})

export const { setFriend } = usersSlice.actions;
export default usersSlice.reducer;