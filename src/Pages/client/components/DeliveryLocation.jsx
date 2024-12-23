import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

const DeliveryLocation = () => {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(null);

  const success = React.useCallback((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }, []);
  console.log(location);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, [success]);

  const error = () => {
    console.log('Unable to retrieve your location');
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
          Select Location
        </Button> */}
      <Input
        className='block text-[#f8d210]'
        id='selectedLocation'
        name='selectedLocation'
        value={
          location
            ? location.latitude + ',' + location.longitude
            : 'Deliver here'
        }
        onClick={handleClickOpen}
        sx={{
          'input': {
            color: '#f8d210' // Set the text color
          },
          '&:hover': {
            color: 'white' // Set the text color
          },
          '&:before': {
            borderBottom: '2px solid #f8d210' // Bottom border color
          },
          '&:after': {
            borderBottom: '2px solid #f8d210' // Focused bottom border color
          },
          '&:hover:not(.Mui-disabled)::before': {
            borderBottom: '2px solid white' // Hover bottom border
          }
        }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          }
        }}
      >
        <DialogTitle>Delivery Location</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide your delivery location to see products at nearby
            store
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin='dense'
            id='location'
            name='currentLocation'
            label='Current Location'
            type='text'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit'>Confirm</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeliveryLocation;
