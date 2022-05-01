import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  fetched: false,
  tickets: [],
};

const getTicketsSlice = createSlice({
  name: "GetTickets",
  initialState,
  reducers: {
    fetchTickets(state) {
      state.loading = true;
    },
    fetchTicketsSuccess(state, action) {
      console.log("success");
      state.loading = false;
      state.fetched = true;
      state.tickets = action.payload.tickets;
    },
  },
});

export const getTicketsStateSelector = (state) => state.tickets;

const getTicketsActions = getTicketsSlice.actions;

export { getTicketsActions, getTicketsSlice };
