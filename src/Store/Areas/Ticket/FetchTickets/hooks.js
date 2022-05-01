import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTicketsActions, getTicketsStateSelector } from "./state";



export const useTickets = () => {
  const dispatch = useDispatch();
  const {  loading, tickets } = useSelector(
    getTicketsStateSelector
  );

  const fetchTickets = React.useCallback(() => {
    dispatch(getTicketsActions.fetchTickets());
  }, [dispatch]);

  const setViewDate = React.useCallback(
    (date) => {
      dispatch(getTicketsActions.setViewDate(date));
    },
    [dispatch]
  );

  return {
    loading,
    tickets,
    fetchTickets,
    setViewDate,
    
  };
};
