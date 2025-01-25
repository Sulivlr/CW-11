import React, {useState} from 'react';
import {Button, Grid2, Menu, MenuItem} from '@mui/material';
import {AccountCircle} from '@mui/icons-material';
import {useAppDispatch} from '../../app/hooks';
import {logout} from '../../feauters/users/UsersThunk';
import {useNavigate} from 'react-router-dom';
import {unsetUser} from '../../feauters/users/UsersSlice';


const UserMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleLogout = () => {
    dispatch(logout());
    dispatch(unsetUser());
    navigate('/');
  };

  const navigateToCreateForm = () => {
    navigate('/new-item');
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }
  return (
    <Grid2>
      <Button onClick={handleClick} color="inherit">
        <AccountCircle />
      </Button>
      <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose} keepMounted>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem onClick={navigateToCreateForm}>Create New Item</MenuItem>
      </Menu>
    </Grid2>
  );
};

export default UserMenu;