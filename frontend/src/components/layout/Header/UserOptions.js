import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import Backdrop from "@material-ui/core/Backdrop";
import DashBoardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/userAction";
const UserOptions = ({ user }) => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const options = [
    { icon: <ListAltIcon />, title: "Orders", func: orders },
    { icon: <PersonIcon />, title: "Profile", func: account },
    { icon: <ExitToAppIcon />, title: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashBoardIcon />,
      title: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/dashboard");
  }
  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        className="speedDial"
        ariaLabel="SpeedDial"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        style={{ zIndex: "11" }}
        icon={
          <img
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
            className="speedDialIcon"
          />
        }
      >
        {options.map((option) => (
          <SpeedDialAction
            icon={option.icon}
            tooltipTitle={option.title}
            onClick={option.func}
            key={option.title}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
