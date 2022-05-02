import {
  Modal,
  Box,
  Paper,
  Input,
  TextField,
} from "@mui/material";
import React from "react";
import { useToastDispatcher } from "../Store/Areas/Toast/hooks";
import { useEditEvent } from "../Store/Areas/Event/EditEvent/hooks";
import { useEvents } from "../Store/Areas/Event/FetchEvents/hooks";
import { StaticDatePicker } from "@mui/lab";
import { FormatDateString } from "../Utils/DateUtils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 800,
  maxHeight: "80vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const EditEventModal = ({ open, onClose, event }) => {
  const [title, setTitle] = React.useState(event.title);
  const [description, setDescription] = React.useState(event.description);
  const [date, setDate] = React.useState(event.date);
console.log(event)
  const { fetchEvents } = useEvents();
  

  const { onSubmitEdit, onSubmitDelete } = useEditEvent();

  const { addToast } = useToastDispatcher();

  const onSubmitEvent = React.useCallback(async () => {
    await onSubmitEdit({
      id: event.id,
      title: title,
      description: description,
      date: date,
    });
    onClose();
    fetchEvents();
    addToast(`Event has been updated!`);
  }, [addToast, date, description, event.id, fetchEvents, onClose, onSubmitEdit, title]);

  const onSubmitDeleteTicket = React.useCallback(async () => {
    await onSubmitDelete({
      id: event.id,
    });
    onClose();
    fetchEvents();
    addToast(`Ticket has been deleted!`);
  }, [addToast, event.id, fetchEvents, onClose, onSubmitDelete]);

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ padding: 50 }}>
        <Paper sx={style} style={{ overflowY: "scroll" }}>
          <Box display="flex" justifyContent="center" flexDirection={"column"}>
            <p style={{ fontSize: 30 }}>Title</p>
            <Input
              style={{ marginBottom: 30 }}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <p style={{ fontSize: 30 }}>Description</p>
            <TextField
              onChange={(e) => setDescription(e.target.value)}
              style={{ marginBottom: 30 }}
              value={description}
              multiline
              rows={4}
            />
            
            <p style={{ fontSize: 30 }}>Date<span style={{ color: "#9c9c9c" }}>
              &nbsp; &nbsp; &nbsp; {FormatDateString(date)}
            </span></p>
          <StaticDatePicker onChange={(newValue) => {
              setDate(newValue);
            }}
            displayStaticWrapperAs="desktop"
            renderInput={(params) => <TextField {...params} />}
            value={date}/>
            

            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              style={{ width: "100%", marginTop: 40 }}
            >
              <div style={{ marginRight: 30 }}>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={onSubmitDeleteTicket}
                >
                  Delete
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={onSubmitEvent}
                >
                  Save
                </button>
              </div>
            </Box>
          </Box>
        </Paper>
      </div>
    </Modal>
  );
};
