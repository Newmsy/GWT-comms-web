import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
};

const createTicketsSlice = createSlice({
  name: "CreateTicket",
  initialState,
  reducers: {
    createTicket(state) {
      state.loading = true;
    },
    createTicketSuccess(state, action) {
      state.loading = false;
    },
  },
});

export const createTicketStateSelector = (state) => state.createTicket;

const createTicketActions = createTicketsSlice.actions;

export { createTicketActions, createTicketsSlice };
