import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function BasicMenu({ setFormOpen, onDelete, className }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    setAnchorEl(null);
    onDelete();
  };
  const handleEdit = () => {
    setAnchorEl(null);
    setFormOpen(true);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`absolute top-0 right-0 p-2 text-slate-500 ${className}`}
      >
        <MoreVertIcon />
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button"
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
}
