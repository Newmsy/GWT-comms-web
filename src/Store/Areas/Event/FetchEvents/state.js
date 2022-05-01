import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  fetched: false,
  events: [],
};

const getEventsSlice = createSlice({
  name: "GetEvents",
  initialState,
  reducers: {
    fetchEvents(state) {
      console.log('clled fetch events')
      state.loading = true;
    },
    fetchEventsSuccess(state, action) {
      console.log("success");
      state.loading = false;
      state.fetched = true;
      state.events = action.payload.events;
    },
  },
});

export const getEventsStateSelector = (state) => state.events;

const getEventsActions = getEventsSlice.actions;

export { getEventsActions, getEventsSlice };
