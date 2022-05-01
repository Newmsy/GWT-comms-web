import React from "react";
import { Layout } from "./Layout/layout";
import { Calendar } from "./Pages/Home";
import { configureStore } from "./Store/configureStore";
import { Provider } from "react-redux";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Toast } from "./Store/Areas/Toast/components";
import { TicketsListener } from "./Store/Areas/Ticket/FetchTickets/components"
import { EventsListener } from "./Store/Areas/Event/FetchEvents/components"

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <TicketsListener />
      <EventsListener />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="App">
          <Toast />
          <Layout>
            <Calendar />
          </Layout>
        </div>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
