import React from "react";
import { useTickets } from "../../Store/Areas/Ticket/FetchTickets/hooks";
import {
  Box,
  Paper,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FormatDateString } from "../../Utils/DateUtils";
import { EditTicketModal } from "../../Components/EditTicketModal";
import { useEvents } from "../../Store/Areas/Event/FetchEvents/hooks";
import { EditEventModal } from "../../Components/EditEventModal";

export const Calendar = () => {
  const { tickets } = useTickets();
  const { events } = useEvents();
  console.log(events)
  const styles = useStyles();
  const [editingItem, setEditingItem] = React.useState(null);
  const [editingEvent, setEditingEvent] = React.useState(null);
  const [filterStatus, setFilterStatus] = React.useState("All")

  const filteredTickets = React.useMemo(()=>{
    return tickets.filter(ticket => filterStatus === "All" || ticket.status === filterStatus)
  },[filterStatus, tickets])

  console.log(filteredTickets)

  const sprintTickets = React.useMemo(()=>{
    return filteredTickets.filter(x => x.isInSprint)
  },[filteredTickets])

  const nonSprintTickets = React.useMemo(()=>{
    return filteredTickets.filter(x => !x.isInSprint)
  },[filteredTickets])

  const sprintEta = React.useMemo(()=>{
    return sprintTickets.reduce((prev,curr)=>{return prev+(curr.status!=="Completed"? curr.etaDays:0)},0)
  },[sprintTickets])
  

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#f2f2f2",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      {editingItem != null && (
        <EditTicketModal
          open={editingItem != null}
          onClose={() => setEditingItem(null)}
          ticket={{ ...editingItem?.ticket }}
        />
      )}
      {editingEvent != null && (
        <EditEventModal
          open={editingEvent != null}
          onClose={() => setEditingEvent(null)}
          event={{ ...editingEvent?.event }}
        />
      )}
      <Paper
        style={{
          width: "80%",
          marginTop: 50,
          paddingTop: 20,
          paddingBottom: 50,
        }}
      >
        <Box
          marginLeft={4}
          marginTop={4}
          paddingRight={10}
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <p className={styles.titleB} style={{fontSize: 30}}>Current Sprint</p>
          <p>Total ETA remaining: <b>{sprintEta} day(s)</b></p>
        </Box>
        <Box marginLeft={4}>
              <p style={{ fontSize: 20, marginBottom: 0 }}>Filter</p>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ minWidth: 200 }}
                
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="InProgress">In Progress</MenuItem>
              </Select>
            </Box>

        <Box
          marginLeft={4}
          marginTop={4}
          paddingRight={10}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          {sprintTickets?.map((ticket) => (
            <TicketItem data={{ ...ticket }} setEditingItem={setEditingItem} />
          ))}
        </Box>
        <Box
          marginLeft={4}
          marginTop={8}
          paddingRight={10}
          display="flex"
          justifyContent="space-between"
        >
          <p className={styles.titleB} style={{fontSize: 30}}>Backlog</p>
        </Box>

        <Box
          marginLeft={4}
          marginTop={4}
          paddingRight={10}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          {nonSprintTickets?.map((ticket) => (
            <TicketItem data={{ ...ticket }} setEditingItem={setEditingItem} />
          ))}
        </Box>
      </Paper>
      <Paper
        style={{
          width: "80%",
          marginTop: 50,
          paddingTop: 20,
          paddingBottom: 50,
        }}
      >
        <Box
          marginLeft={4}
          marginTop={4}
          paddingRight={10}
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <p className={styles.titleB}>Meetings</p>
          
        </Box>

        <Box
          marginLeft={4}
          marginTop={4}
          paddingRight={10}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          {events?.map((event) => (
            <CalendarItem data={{ ...event }} setEditingItem={setEditingEvent} />
          ))}
        </Box>
        
      </Paper>
    </div>
  );
};

const TicketItem = ({
  data: {
    title,
    description,
    createdBy,
    dateAdded,
    dateUpdated,
    isInSprint,
    status,
    etaDays,
    id,
  },
  setEditingItem,
}) => {
  const styles = useStyles();
  console.log(id);
  return (
    <Box className={styles.ticketItem}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box>
          <h2>{title}</h2>
          <p>{description.split("\n").map(item => <p>{item}</p>)}</p>
        </Box>
        <Button
          onClick={() =>
            setEditingItem({
              ticket: {
                title,
                description,
                createdBy,
                dateAdded,
                dateUpdated,
                status,
                isInSprint,
                etaDays,
                id,
              },
            })
          }
        >
          Edit
        </Button>
      </Box>

      <Box display="flex" flexDirection="row">
        <p className={styles.descriptionText}>
          Created by: <b>{createdBy}</b>
        </p>
        <p className={styles.descriptionText}>
          ETA: <b>{etaDays} day(s)</b>
        </p>
        <p className={styles.descriptionText}>
          Status: <b>{status}</b>
        </p>
        <p className={styles.descriptionText}>
          Date added: <b>{FormatDateString(dateAdded)}</b>
        </p>
      </Box>
    </Box>
  );
};

export const CalendarItem = ({
  data: {
    title,
    description,
    date,
    id,
  },
  setEditingItem,
}) => {
  const styles = useStyles();
  
  return (
    <Box className={styles.ticketItem}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box>
          <h2>{title} - {FormatDateString(date)}</h2>
          <p>{description.split("\n").map(item => <p>{item}</p>)}</p>
        </Box>
        <Button
          onClick={() =>
            setEditingItem({
              event: {
                title,
                description,
                date,
                id,
              },
            })
          }
        >
          Edit
        </Button>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({
  descriptionText: {
    marginRight: 30,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
  },
  titleB: {
    color: "#000",
    fontSize: 30,
  },
  desc: {
    color: "#fff",
    fontSize: 16,
  },
  ticketItem: {
    //backgroundColor: "red",
    fontSize: 16,
    marginBottom: 20,
    borderBottom: "1px solid grey",
  },
});
