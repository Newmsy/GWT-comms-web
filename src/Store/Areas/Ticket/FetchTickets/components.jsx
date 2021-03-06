import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userStateSelector } from "../../User/state";
import { getTicketsActions, getTicketsStateSelector } from "./state";

export const TicketsListener = () => {
  const dispatch = useDispatch();
  const { loading, fetched, tickets, viewDate } = useSelector(
    getTicketsStateSelector
  );
  const { isSignedIn } = useSelector(userStateSelector);
    
  console.log(tickets);
  React.useEffect(() => {
    if (!fetched && !loading && isSignedIn)
      dispatch(getTicketsActions.fetchTickets());
  }, [dispatch, fetched, isSignedIn, loading]);

  React.useEffect(() => {
    dispatch(getTicketsActions.fetchTickets());
  }, [dispatch, viewDate]);
  return <div />;
};
