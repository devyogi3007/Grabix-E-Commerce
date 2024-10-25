import { Button } from "@material-ui/core";
import { useAuth } from "../../context/AuthContext";
import "./navbar.scss";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import * as React from "react";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
// import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
// import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
// import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
// import { DarkModeContext } from "../../context/darkModeContext";
// import { useContext } from "react";

const Navbar = ({ open, setOpen }) => {
  // eslint-disable-next-line no-unused-vars
  // const { dispatch } = useContext(DarkModeContext);
  const auth = useAuth();

  const currentUser = auth.token || {};

  console.log(currentUser);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const anchorElOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        {/* <div className="search"></div> */}
        <div
          className="cursor-pointer"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <MenuIcon />
        </div>
        <div className="items">
          {/* <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div> */}
          {/* <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div> */}
          {/* <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div> */}
          <Tooltip title="Account">
            <Button
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              {/* <Avatar sx={{ width: 32, height: 32 }}>M</Avatar> */}
              <div className="item flex gap-3">
                <img
                  src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                  className="avatar"
                />
                <p className="font-bold">
                  {currentUser?.name ||
                    `${currentUser?.firstName} ${currentUser?.lastName}`}
                </p>
              </div>
            </Button>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={anchorElOpen}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0
                  }
                }
              }
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={() => {
                auth.logOut();
                setAnchorEl(null);
              }}
            >
              <div className="flex justify-evenly items-center py-1">
                <Logout fontSize="small" className="mx-3" />
                <p className="pe-5">Logout</p>
              </div>
            </MenuItem>
          </Menu>
          {/* <div className="item flex gap-3">
            <p className="font-bold">
              {currentUser?.name ||
                `${currentUser?.firstName} ${currentUser?.lastName}`}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
