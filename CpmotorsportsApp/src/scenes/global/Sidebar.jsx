import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CarRentalIcon from "@mui/icons-material/CarRental";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ConstructionIcon from "@mui/icons-material/Construction";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BuildIcon from "@mui/icons-material/Build";
import HandymanIcon from "@mui/icons-material/Handyman";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AppsIcon from "@mui/icons-material/Apps";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  CP MOTORSPORTS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                {/* <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                /> */}
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Carlos
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "1%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Management
            </Typography>
            <Item
              title="Customers"
              to="/customers"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Customer Cars"
              to="/customer_cars"
              icon={<CarRentalIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Projects"
              to="/projects"
              icon={<NoCrashIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Custom Parts"
              to="/custom_parts"
              icon={<HandymanIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Mechanics"
              to="/mechanics"
              icon={<EngineeringIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Services"
              to="/services"
              icon={<BuildIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Makes"
              to="/makes"
              icon={<DirectionsCarIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Models"
              to="/models"
              icon={<DirectionsCarFilledIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Reports
            </Typography>
            <Item
              title="Customer Projects "
              to="/completed_projects"
              icon={<HowToRegIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Yearly Projects "
              to="/completed_projects_per_year"
              icon={<WorkHistoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Custom Parts "
              to="/c_parts_projects"
              icon={<HomeRepairServiceIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Mechanics Time"
              to="/mech_cutomer_time"
              icon={<AccessTimeFilledIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Custom Job"
              to="/fabrication_installation"
              icon={<ConstructionIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Invoice"
              to="/invoice"
              icon={<RequestQuoteIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Project Job Status"
              to="/project_job_status"
              icon={<WorkOutlineIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
