import { takeLatest, put } from "redux-saga/effects";
import { createEventActions } from "./state";
import { ApiClient } from "../../../apiClient";

function* createEventWorker(action) {
  const apiClient = new ApiClient();

  const response = yield apiClient.post(
    "/api/event",
    {
      title: action.payload.title,
        description: action.payload.description,
        date: action.payload.date,
    },
    false
  );
  if (response?.ok) {
    yield put(createEventActions.createEventSuccess());
  }
}

export function* createEventWatcher() {
  yield takeLatest(
    createEventActions.createEvent.toString(),
    createEventWorker
  );
}
