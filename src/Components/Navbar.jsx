import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Avatar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import useIsMobile from "./useIsMobile";
import useJobStore from "../store/jobStore";

// Custom Globe SVG Icon as a React component
function GlobeIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M15 15H22.5V16.5H15V15ZM15 18H19.5V19.5H15V18Z" fill="black" />
      <path
        d="M22.5 12.75V12C22.498 9.82186 21.818 7.69836 20.5545 5.92418C19.2909 4.15001 17.5064 2.81315 15.4486 2.09914C13.3908 1.38512 11.1618 1.32935 9.07086 1.93958C6.97995 2.5498 5.13083 3.79575 3.78011 5.50452C2.4294 7.21329 1.64409 9.30013 1.53315 11.4754C1.42221 13.6508 1.99116 15.8067 3.16103 17.644C4.33089 19.4813 6.04367 20.9089 8.06166 21.7287C10.0797 22.5484 12.3028 22.7197 14.4225 22.2188L14.0775 20.7593C13.3967 20.92 12.6995 21.0008 12 21C11.8575 21 11.7188 20.9858 11.5778 20.9797C9.95021 18.5401 9.06186 15.6824 9.01953 12.75H22.5ZM20.9693 11.25H16.4813C16.3974 8.48662 15.686 5.77853 14.4008 3.33075C16.1728 3.82305 17.7519 4.84558 18.9262 6.26112C20.1004 7.67666 20.8128 9.41749 20.9693 11.25ZM12.4223 3.02025C14.0499 5.45986 14.9382 8.31762 14.9805 11.25H9.01953C9.06186 8.31762 9.95021 5.45986 11.5778 3.02025C11.7188 3.015 11.8575 3 12 3C12.1425 3 12.2813 3.01425 12.4223 3.02025ZM9.59928 3.33075C8.3141 5.77853 7.60265 8.48662 7.51878 11.25H3.03153C3.18786 9.41768 3.90083 7.67699 5.07477 6.26147C6.24872 4.84595 7.82749 3.82331 9.59928 3.33075ZM9.59928 20.6693C7.82749 20.1767 6.24872 19.1541 5.07477 17.7385C3.90083 16.323 3.18786 14.5823 3.03153 12.75H7.51878C7.60265 15.5134 8.3141 18.2215 9.59928 20.6693Z"
        fill="black"
      />
    </svg>
  );
}

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { setResumeFile } = useJobStore();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const userData = Cookies.get("user_data")
    ? JSON.parse(Cookies.get("user_data"))
    : "";
  const auth_token = Cookies.get("auth_token");

  const getRandomColor = () => {
    const colors = [
      "#F44336",
      "#E91E63",
      "#9C27B0",
      "#3F51B5",
      "#2196F3",
      "#03A9F4",
      "#00BCD4",
      "#009688",
      "#4CAF50",
      "#8BC34A",
      "#FFC107",
      "#FF9800",
      "#FF5722",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const randomColor = getRandomColor();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    setResumeFile(null);
    const allCookies = Cookies.get();

    Object.keys(allCookies).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "#FFF",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: 64,
          paddingLeft: isMobile ? "16px !important" : "64px !important",
          paddingRight: isMobile ? "16px !important" : "64px !important",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="/workisy logo-01.png"
            alt="workisy logo"
            style={{ height: 38, objectFit: "contain" }}
          />
        </Box>

        {/* Right actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          {/* Services Dropdown */}
          <Button
            startIcon={<GlobeIcon />}
            endIcon={<ArrowDropDownIcon />}
            onClick={handleMenuClick}
            sx={{
              color: "#222",
              textTransform: "none",
              fontWeight: 500,
              fontSize: 15,
              background: "transparent",
              minWidth: 0,
              px: 1,
            }}
          >
            Services
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={{
              "aria-labelledby": "services-button",
            }}
          >
            <MenuItem onClick={handleMenuClose}>AI Resume </MenuItem>
            <MenuItem onClick={handleMenuClose}>Service 2</MenuItem>
          </Menu>

          {/* Sign Up Button */}
          {auth_token ? (
            <>
              <IconButton
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "4px 8px",
                  borderRadius: "20px",
                  border: "1px solid #e0e0e0",
                  backgroundColor: "#fff",
                }}
                onClick={(e) => setAnchorElUser(e.currentTarget)}
              >
                <MenuIcon
                  sx={{ fontSize: 18, marginRight: 2, color: "#757575" }}
                />
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    bgcolor: !userData?.profile_img?.trim()
                      ? randomColor
                      : "transparent",
                  }}
                  src={userData.profile_img}
                >
                  {/* <PersonIcon /> */}

                  {(!userData.profile_img ||
                    userData.profile_img.trim() === "") &&
                  userData.name
                    ? userData.name.charAt(0).toUpperCase()
                    : null}
                </Avatar>
              </IconButton>
              <Menu
                sx={{
                  mt: "45px",
                  p: 2,
                  "& .MuiPaper-root.MuiPaper-elevation": {
                    borderRadius: "12px",
                  },

                  "& .MuiList-root.MuiList-padding": {
                    padding: 2,
                  },
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                <Box
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      mb: 1,
                      bgcolor: !userData?.profile_img?.trim()
                        ? randomColor
                        : "transparent",
                    }}
                    src={userData.profile_img}
                  >
                    {/* <PersonIcon /> */}

                    {(!userData.profile_img ||
                      userData.profile_img.trim() === "") &&
                    userData.name
                      ? userData.name.charAt(0).toUpperCase()
                      : null}
                  </Avatar>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {userData.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {userData.email}
                  </Typography>
                </Box>

                <Button
                  onClick={handleLogout}
                  fullWidth
                  startIcon={<PowerSettingsNewRoundedIcon />}
                  sx={{
                    borderRadius: "24px",
                    background: "#fa0202",
                    color: "#FFF",
                    textTransform: "capitalize",
                  }}
                >
                  Logout
                </Button>
              </Menu>
            </>
          ) : (
            <Button
              variant="contained"
              startIcon={<PersonIcon />}
              onClick={() => !userData.email && navigate("/signup")}
              sx={{
                background: "#222",
                color: "#fff",
                textTransform: "none",
                borderRadius: "20px",
                fontWeight: 500,
                fontSize: 14,
                px: 2,
                py: 1,
                pointerEvents: userData.email ? "none" : "auto",
                boxShadow: "none",
                "&:hover": {
                  background: "#111",
                  boxShadow: "none",
                },
              }}
            >
              Sign Up
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
