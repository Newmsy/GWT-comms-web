import { takeLatest, put } from "redux-saga/effects";
import { getTicketsActions } from "./state";
import { ApiClient } from "../../../apiClient";

function* fetchTicketsWorker() {
  const apiClient = new ApiClient();

  const response = yield apiClient.get("/api/ticket/getall", false);

  if (response?.ok) {
    const data = yield response.json();

    
   
      yield put(getTicketsActions.fetchTicketsSuccess({ tickets: data.data }));
  }
}

export function* fetchTicketsWatcher() {
  yield takeLatest(getTicketsActions.fetchTickets.toString(), fetchTicketsWorker);
}
