import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEventsActions, getEventsStateSelector } from "./state";



export const useEvents = () => {
  const dispatch = useDispatch();
  const {  loading, events } = useSelector(
    getEventsStateSelector
  );

  const fetchEvents = React.useCallback(() => {
    dispatch(getEventsActions.fetchEvents());
  }, [dispatch]);

  const setViewDate = React.useCallback(
    (date) => {
      dispatch(getEventsActions.setViewDate(date));
    },
    [dispatch]
  );

  return {
    loading,
    events,
    fetchEvents,
    setViewDate,
    
  };
};
