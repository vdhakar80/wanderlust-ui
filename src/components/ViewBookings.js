import React, { Component } from 'react';
/*Importing necessary modules */
import axios from 'axios';
import Booking from './Booking';
import { Link } from 'react-router-dom';
import MoodIcon from '@material-ui/icons/SentimentDissatisfiedRounded'
import { backendUrlGetBookings } from "../BackendURL";

class ViewBookings extends Component {
    constructor() {
        super()
        this.state = {
            bookingData: [],
            noBookings: false
        }
    }
    fetchBookings = () => {
        /**
         * Making an axios GET request to fetch the booking details of the user by userId
         */
        let userId = sessionStorage.getItem("userId");
        let url = backendUrlGetBookings + userId;
        axios.get(url).then(res => {
            this.setState({ bookingData: res.data })
        }).catch(err => {
            if (err.response) {
                this.setState({ bookingData: [] })
            }
            else {
                this.setState({ bookingData: [] })
            }
        })
    }

    componentDidMount = () => {
        this.fetchBookings()
    }


/**
 * Rendering the Bookings of the user in the card
 * If no bookings available , showing a message
 * Also creating a link to redirect to book the package
 */
    render() {
        return (
            <div className="container-fliud">
                <div className="row mx-auto" style={{display:"flex", justifyContent:"center"}}>
                    {this.state.bookingData.length > 0 ?
                        this.state.bookingData.map(booking => <Booking key={booking.bookingId} booking={booking} />) :
                        <>
                            <br />
                            <div className="text-center m-3">
                                <MoodIcon style={{ fontSize: 100, color: "red" }}></MoodIcon>
                                <h1 className="text-primary">Sorry You have not planned any trips with us yet!</h1>
                                <Link to="/packages" className="btn btn-success btn btn-large">CLICK HERE TO START BOOKING</Link>
                            </div>
                        </>
                    }

                </div>

            </div>
        )
    }

}

export default ViewBookings;



























// let bookingData = [
//     { bookingId: "B1001", userId: "U1001", destId: "D1001", destinationName: "A Week in Greece: Athens, Mykonos & Santorini", checkInDate: "2018-12-09", checkOutDate: "2018-12-16", noOfPersons: 2, totalCharges: 5998, timeStamp: new Date().getTime().toString() },
//     { bookingId: "B1002", userId: "U1001", destId: "D1002", destinationName: "Romantic Europe: Paris, Venice & Vienna", checkInDate: "2019-1-10", checkOutDate: "2019-1-24", noOfPersons: 1, totalCharges: 4549, timeStamp: new Date().getTime().toString() },
//     { bookingId: "B1003", userId: "U1002", destId: "D1002", destinationName: "Romantic Europe: Paris, Venice & Vienna", checkInDate: "2019-1-10", checkOutDate: "2019-1-24", noOfPersons: 1, totalCharges: 4549, timeStamp: new Date().getTime().toString() }
// ]