import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Customer from "./scenes/customer";
import Service from "./scenes/services";
import MakeandModel from "./scenes/make_model";
import CustomParts from "./scenes/custom_parts";
import Mechanic from "./scenes/mechanic";
import Project from "./scenes/project";
import Completed_projects from "./scenes/reports/completed_projects_per_customer";
import Invoice from "./scenes/reports/invoice";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/services" element={<Service />} />
              <Route path="/customers" element={<Customer />} />
              <Route path="/make_models" element={<MakeandModel />} />
              <Route path="/custom_parts" element={<CustomParts />} />
              <Route path="/mechanics" element={<Mechanic />} />
              <Route path="/projects" element={<Project />} />
              <Route
                path="/completed_projects"
                element={<Completed_projects />}
              />
              <Route
                path="/c_parts_projects"
                element={<Completed_projects />}
              />
              <Route
                path="/c_parts_customer"
                element={<Completed_projects />}
              />
              <Route
                path="/mech_cutomer_time"
                element={<Completed_projects />}
              />
              <Route
                path="/fabrication_installation"
                element={<Completed_projects />}
              />
              <Route path="/invoice" element={<Invoice />} />
              <Route
                path="/project_job_status"
                element={<Completed_projects />}
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
