import { takeLatest, put } from "redux-saga/effects";
import { createTicketActions } from "./state";
import { ApiClient } from "../../../apiClient";

function* createTicketWorker(action) {
  const apiClient = new ApiClient();

  const response = yield apiClient.post(
    "/api/ticket",
    {
      title: action.payload.title,
        description: action.payload.description,
        isInSprint: action.payload.isInSprint,
        etaDays:  parseInt(action.payload.etaDays),
        createdBy: action.payload.createdBy
    },
    false
  );
  if (response?.ok) {
    yield put(createTicketActions.createTicketSuccess());
  }
}

export function* createTicketWatcher() {
  yield takeLatest(
    createTicketActions.createTicket.toString(),
    createTicketWorker
  );
}
