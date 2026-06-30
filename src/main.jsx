import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./Contexts/Auth.jsx";
import LeadsProvider from "./Contexts/LeadsContext.jsx";
import TasksProvider from "./Contexts/TasksContext.jsx";
import CustomersProvider from "./Contexts/CustomersContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <LeadsProvider>
        <TasksProvider>
          <CustomersProvider>
            <App />
          </CustomersProvider>
        </TasksProvider>
      </LeadsProvider>
    </AuthProvider>
  </StrictMode>,
);
