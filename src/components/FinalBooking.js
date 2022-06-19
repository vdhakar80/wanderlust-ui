import { Link } from "react-router-dom";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import React from 'react';

/* The following code is to render the final booking page 
*  with planned trip Dates
*  Also link to view all the planned trips or bookings done before
*/
let FinalBookig = (props) => {
    let state = props.location.state
    return (
        <div>
            <div><br /><br />
                <div className="col-md-10 offset-1 card bg-light text-dark book-card">
                    <div className="card-body row">
                        
                        <div className="col-md-12">
                        <CheckCircleIcon style={{color:"green", fontSize:70}}/>
                            <h1>Booking Confirm!!!</h1>
                            <h3 className="text-success">Congratulations! Trip to {state.package.name}</h3>
                            <h5>Trip starts on: {new Date(state.checkInDate).toDateString()}</h5>
                            <h5>Trip ends on: {state.checkOutDate}</h5>
                            <Link className="link" to='/viewBookings'>Click here to view your Bookings</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FinalBookig