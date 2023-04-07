import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Dashboard from "./scenes/dashboard/dashboard";
import Customer from "./scenes/customer";
import Service from "./scenes/services";
import CustomerCar from "./scenes/customer_car";
import Make from "./scenes/make";
import Model from "./scenes/model";
import CustomParts from "./scenes/custom_parts";
import Mechanic from "./scenes/mechanic";
import Project from "./scenes/project";
import Completed_projects from "./scenes/reports/completed_projects_per_customer";
import Completed_projects_per_year from "./scenes/reports/completed_projects_per_year";
import Project_Job_Status from "./scenes/reports/project_job_status";
import Fabrication_Installation from "./scenes/reports/fabrication_installation";
import Customer_time from "./scenes/reports/customer_time";
import Custom_Parts_Per_Project from "./scenes/reports/custom_parts_per_project";
import Invoice from "./scenes/reports/invoice";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/services" element={<Service />} />
                <Route path="/customers" element={<Customer />} />
                <Route path="/customer_cars" element={<CustomerCar />} />
                <Route path="/makes" element={<Make />} />
                <Route path="/models" element={<Model />} />
                <Route path="/custom_parts" element={<CustomParts />} />
                <Route path="/mechanics" element={<Mechanic />} />
                <Route path="/projects" element={<Project />} />
                <Route
                  path="/completed_projects"
                  element={<Completed_projects />}
                />
                <Route
                  path="/completed_projects_per_year"
                  element={<Completed_projects_per_year />}
                />
                <Route
                  path="/c_parts_projects"
                  element={<Custom_Parts_Per_Project />}
                />
                <Route
                  path="/c_parts_customer"
                  element={<Completed_projects />}
                />
                <Route path="/mech_cutomer_time" element={<Customer_time />} />
                <Route
                  path="/fabrication_installation"
                  element={<Fabrication_Installation />}
                />
                <Route path="/invoice" element={<Invoice />} />
                <Route
                  path="/project_job_status"
                  element={<Project_Job_Status />}
                />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </LocalizationProvider>
  );
}

export default App;
