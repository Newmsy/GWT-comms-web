import { fork } from "redux-saga/effects";
import { userWatcher, signInUserWatcher } from "./Areas/User/effects";
import { createTicketWatcher } from "./Areas/Ticket/CreateTicket/effects";
import { createEventWatcher } from "./Areas/Event/CreateEvent/effects";
import { fetchTicketsWatcher } from "./Areas/Ticket/FetchTickets/effects";
import { fetchEventsWatcher } from "./Areas/Event/FetchEvents/effects";

function* rootSaga() {
  yield fork(userWatcher);
  yield fork(signInUserWatcher);
  yield fork(createTicketWatcher);
  yield fork(fetchTicketsWatcher);
  yield fork(fetchEventsWatcher);
  yield fork(createEventWatcher);
}

export { rootSaga };
