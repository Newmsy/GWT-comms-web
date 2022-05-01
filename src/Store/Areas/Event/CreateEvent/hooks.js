import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createEventActions, createEventStateSelector } from "./state";
import {userStateSelector} from "../../User/state"

export const useCreateEvent = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(
    createEventStateSelector
  );
  const { name } = useSelector(
    userStateSelector
  );

  const createEvent = React.useCallback(
    ({ title, description, date }) => {
      dispatch(
        createEventActions.createEvent({
          title: title,
          description: description,
          date: date
        })
      );
    },
    [dispatch]
  );

  return {
    name,
    loading,
    createEvent,
  };
};
