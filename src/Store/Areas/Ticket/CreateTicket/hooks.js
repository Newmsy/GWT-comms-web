import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTicketActions, createTicketStateSelector } from "./state";
import {userStateSelector} from "../../User/state"

export const useCreateTicket = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(
    createTicketStateSelector
  );
  const { name } = useSelector(
    userStateSelector
  );
  console.log(name)

  const createTicket = React.useCallback(
    ({ title, description, isInSprint, eta }) => {
      console.log("Called create event");
      dispatch(
        createTicketActions.createTicket({
          title: title,
          description: description,
          isInSprint: isInSprint,
          etaDays: eta, 
          createdBy: name
        })
      );
    },
    [dispatch, name]
  );

  return {
    name,
    loading,
    createTicket,
  };
};
