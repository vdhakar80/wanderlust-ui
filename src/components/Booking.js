import React from 'react';
/*Importing necessary modules */
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { Slide } from '@material-ui/core';
import { backendUrlCancelBooking } from "../BackendURL";


let Booking = (props) => {

  let [cancleStatus, setCancleStatus] = React.useState(false);
  let [deleted, setDeleted] = React.useState(false);
  let booking = props.booking;
  let checkInDate = new Date(booking.checkInDate).toDateString();
  let checkOutDate = new Date(booking.checkOutDate).toDateString();

  let confirm_cancel = () => {
    setCancleStatus(true);
  }
  
  let handleClose = () => {
    setCancleStatus(false);
    setDeleted(false);
  }

  let cancleBooking = () => {
    /* 
    * Make aN axios DELETE request to cancel the selected booking 
    */
    console.log(JSON.stringify(booking),"booking data",booking.destId);
    let url = backendUrlCancelBooking + booking.bookingId + "/" + sessionStorage.getItem("userId")+"/"+booking.destId+"/"+booking.noOfPersons;
    axios.delete(url).then(res => {
      setDeleted(true);
      setTimeout(() => { window.location.reload() }, 1500)
    }).catch(err => {

    })
  }


  return (
    <>
      <div className="m-4 card bg-light text-left" style={{ width: 400 }}>
        <div className="card-header">Booking ID: {booking.bookingId}</div>
        <div className="row card-body">
          <div className="col-md-8">
            <h4>{booking.destinationName}</h4>
            <h6>Trip starts on: {checkInDate}</h6>
            <h6>Trip ends on: {checkOutDate}</h6>
            <h6>Travellers: {booking.noOfPersons}</h6>
          </div>
          <div>
            <br />
            <h6>Fare Details</h6>
            <h6>${booking.totalCharges}</h6>
            <button className="btn btn-sm btn-warning" type="button" onClick={() => confirm_cancel(booking)} >Claim Refund</button>
          </div>
        </div>
        <div className="card-footer"></div>
      </div>
      <Dialog
        open={cancleStatus}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Slide}
      >
        <DialogTitle id="alert-dialog-title">{booking.destinationName}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to cancel the booking?
         </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <div className="text-success">
              <h6>Trip starts on: {checkInDate}</h6>
              <h6>Trip ends on: {checkOutDate}</h6>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => { handleClose(); cancleBooking() }} color="secondary">
            Yes
         </Button>
          <Button onClick={handleClose} color="primary" variant="outlined" autoFocus>
            No
         </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleted}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{booking.destinationName}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Booking is deleted
         </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            ok
         </Button>
        </DialogActions>
      </Dialog>
    </>


  )
}

//exporting the Booking component
export default Booking;
