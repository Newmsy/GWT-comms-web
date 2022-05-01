import {
  Modal,
  Box,
  Paper,
  Input,
  TextField,
} from "@mui/material";
import React from "react";
import { useToastDispatcher } from "../Store/Areas/Toast/hooks";
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

export const CreateEventModal = ({ open, onClose, onSubmit }) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  
  const [date, setDate] = React.useState(new Date());

  const { fetchEvents } = useEvents();


  const { addToast } = useToastDispatcher();

  const onSubmitEvent = React.useCallback(async () => {
    await onSubmit({
        title: title,
        description: description,
        date: date,
    });
    onClose();
    setTimeout(()=>{fetchEvents();}, 2000)
    
    addToast(`New event has been added!`);
  }, [addToast, date, description, fetchEvents, onClose, onSubmit, title]);

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{padding: 50}}>
      <Paper sx={style} style={{ overflowY: "scroll" }}>
        <Box display="flex" justifyContent="center" flexDirection={"column"}>
          <p style={{ fontSize: 30 }}>Title</p>
          <Input
            style={{ marginBottom: 30 }}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p style={{ fontSize: 30 }}>Description</p>
          <TextField
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginBottom: 30 }}
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
            <div>
              <button
                type="button"
                className="btn btn-success"
                onClick={onSubmitEvent}
              >
                Create Event
              </button>
            </div>
          </Box>
        </Box>
      </Paper>
      </div>
    </Modal>
  );
};
