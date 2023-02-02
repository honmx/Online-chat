import { createSlice } from "@reduxjs/toolkit";
// import { fetchMessages } from "../../services/fetchMessages";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: []
  },
  reducers: {
    setMessages(state, action) {
      // console.log(action.payload);
      state.messages = action.payload;
    },
    addMessage(state, action) {
      // debugger;
      state.messages.push(action.payload);
    }
  }
});

export const { setMessages, addMessage } = chatSlice.actions;
export default chatSlice.reducer;