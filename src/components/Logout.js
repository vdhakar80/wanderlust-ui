import React from 'react';
/*necessary imports */
import { Redirect } from 'react-router';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from "@material-ui/styles";
import { Slide } from '@material-ui/core';

const useStyle = makeStyles(() => ({
  root: {
    backgroundColor: "lightblue"
  },
  box: {

  }
}))



let Logout = () => {
  /*
    Using functional component for the logging out with Hooks
  */

  let [session, setSession] = React.useState(false);
  let [popup, setPopup] = React.useState(true)
  let [back, setBack] = React.useState(false)

  const classes = useStyle()

  let clearSession = () => {
    sessionStorage.clear()
    setSession(true);
    setTimeout(() => {
      window.location.reload();
    }, 10);
  }
  let handleClose = () => {
    setSession(false)
    setPopup(false);
    setBack(true);
  }

  if (session) {
    return <Redirect to="/" push />
  }
  if (back) {
    return <Redirect to="/" push />
  }
  return (
    <React.Fragment>
      {/* confirming the Log out session */}
      <Dialog
        open={popup}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Slide}

      >
        <DialogContent>
          <DialogTitle id="alert-dialog-description">
            <b>Do You Want to LogOut?</b>
          </DialogTitle>

        </DialogContent>
        <DialogActions>
          <Button variant='contained' className={classes.root} onClick={() => { handleClose(); clearSession() }}>
            Yes
         </Button>
          <Button variant='contained' onClick={handleClose} >
            No
         </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default Logout;





