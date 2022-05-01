import { combineReducers } from "redux";
import { userSlice } from "./Areas/User/state";
import { createTicketsSlice } from "./Areas/Ticket/CreateTicket/state";
import { getTicketsSlice } from "./Areas/Ticket/FetchTickets/state";
import { toastSlice } from "./Areas/Toast/state";
import { SavedTicketsSlice } from "./Areas/Ticket/SavedTickets/state";
import { createEventsSlice } from "./Areas/Event/CreateEvent/state";
import { getEventsSlice } from "./Areas/Event/FetchEvents/state";

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  createTicket: createTicketsSlice.reducer,
  createEvent: createEventsSlice.reducer,
  tickets: getTicketsSlice.reducer,
  events: getEventsSlice.reducer,
  toast: toastSlice.reducer,
  SavedTickets: SavedTicketsSlice.reducer,
});
