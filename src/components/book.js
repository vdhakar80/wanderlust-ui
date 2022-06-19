import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import Switch from "@material-ui/core/Switch"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText'
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { TextField } from '@material-ui/core';
import { Slide } from '@material-ui/core';
import { backendUrlCreateBooking } from "../BackendURL";


class Book extends Component {

    constructor(props) {
        super(props)

        this.state = {
            bookingPage: false,
            showItinerary: false,
            bookingForm: {
                noOfPersons: "",
                checkInDate: "",
                flights: false
            },
            bookingFormErrorMessage: {
                noOfPersons: "",
                checkInDate: ""
            },
            bookingFormValid: {
                noOfPersons: false,
                checkInDate: false,
                buttonActive: false
            },
            errorMessage: "",
            successMessage: "",
            totalCharges: "",
            index: "",
            checkOutDate: new Date(),
            button: false,
            package: this.props.package,
            bookingSuccessFull: false,
            newPage: false,
            bookEnable: false,
            sessionVar: false,
            type: 'text',
            confirmation: false
        }

    }

    handleConfirmation = () => {
        this.setState({ confirmation: true })
    }

    handleBookButton = () => {
        /* 
            Make aN axios POST request to with form data 
            and handle success and error cases 
        */
        let url = backendUrlCreateBooking + sessionStorage.getItem("userId");
        let data = {
            package: this.state.package,
            formData: this.state.bookingForm,
            totalCharges: this.state.totalCharges,
            checkOutDate: this.state.checkOutDate
        }
        axios.post(url, data).then(data => {
            this.setState({ bookingSuccessFull: true, newPage: true })
        }).catch(err => {
            if (err.response) {
                this.setState({ bookingSuccessFull: false, errorMessage: err.response.data.message });
            }
            else {
                this.setState({ bookingSuccessFull: false, errorMessage: err.message });

            }
        })
    }

    /**
    * handling the change on the form fields 
    * calling the validate method to check the validation
    * Also calling the calculate charge method if the flight switch is checked
    */
    handleChange = (event) => {
        const target = event.target;
        const name = target.name;

        if (target.checked) {
            var value = target.checked;
        } else {
            value = target.value
        }
        const { bookingForm } = this.state;

        if (name === "flights") {
            this.setState({
                bookingForm: { ...bookingForm, [name]: value }
            }, () => {
                this.calculateCharges();
            });
        }
        else {
            this.setState({
                bookingForm: { ...bookingForm, [name]: value }
            });
        }
        this.validateField(name, value);

    }


    /*
    * Validating the input values of the form
    * handling the error message if validation fails
    * handling the disability of the book button
    */
    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.bookingFormErrorMessage;
        let formValid = this.state.bookingFormValid;
        switch (fieldName) {
            case "noOfPersons":
                if (value === "") {
                    fieldValidationErrors.noOfPersons = "Field Required";
                    formValid.noOfPersons = false;
                } else if (value < 1) {
                    fieldValidationErrors.noOfPersons = "Select atleast one Person";
                    formValid.noOfPersons = false;
                } else if (value > 5) {
                    fieldValidationErrors.noOfPersons = "No. of Persons can't be greater than 5"
                    formValid.noOfPersons = false;
                } else {
                    fieldValidationErrors.noOfPersons = "";
                    formValid.noOfPersons = true;
                }
                break;
            case "checkInDate":
                if (value === "") {
                    fieldValidationErrors.checkInDate = "Field Required";
                    formValid.checkInDate = false;
                } else {
                    let checkInDate = new Date(value);
                    let todayDate = new Date();
                    if (todayDate > checkInDate) {
                        fieldValidationErrors.checkInDate = "You can't Travel in the past!";
                        formValid.checkInDate = false;
                    } else {
                        fieldValidationErrors.checkInDate = "";
                        formValid.checkInDate = true;
                    }
                }
                break;
            default:
                break;
        }
        formValid.buttonActive = formValid.noOfPersons && formValid.checkInDate;

        this.setState({
            bookingFormErrorMessage: fieldValidationErrors,
            bookingFormValid: formValid,
            successMessage: ""
        });
    }

    handleDialogClose = () => {
        this.setState({ bookingSuccessFull: false })
    }

    /**handling the date field */
    handleClick = () => {
        this.setState({ type: 'date' })
    }

    handleSubmit = (event) => {
        /**
        * Preventing the whole page from refreshing
        * calling the calculate charges function
        */
        event.preventDefault();
        this.calculateCharges();
    }

    calculateCharges = () => {
        /**
         * Calculating the charges of the selected person
         * The charges are calculated on the no. of persons
         * IF the package selected has a discount it would be calculated during the calculate charges
         */
        this.setState({ totalCharges: 0 });
        let oneDay = 24 * 60 * 60 * 1000;
        let checkInDate = new Date(this.state.bookingForm.checkInDate);
        let outDate = Math.round(Math.abs((checkInDate.getTime() + (this.props.package.noOfNights) * oneDay)));
        let finalDate = new Date(outDate);
        this.setState({ checkOutDate: finalDate.toDateString() });
        if (this.state.bookingForm.flights) {
            let totalCost = (this.state.bookingForm.noOfPersons) * this.props.package.chargesPerPerson + this.props.package.flightCharges;
            if (this.props.package.discount > 0) {
                totalCost = totalCost - (this.props.package.discount / 100) * totalCost
            }
            this.setState({ totalCharges: totalCost })
        } else {
            let totalCost = (this.state.bookingForm.noOfPersons) * this.props.package.chargesPerPerson;
            if (this.props.package.discount > 0) {
                totalCost = totalCost - (this.props.package.discount / 100) * totalCost
            }
            this.setState({ totalCharges: totalCost })
        }
        this.setState({ button: true })
    }

    handleCalculateCharges = () => {
        this.setState({ bookEnable: true })
    }

    handleSession = () => {
        alert("login before book package")
        this.setState({ sessionVar: true })
    }

    render() {
        let selectedDeal = this.props.package
        //Redirecting to login page if the user is not logged in
        if (this.state.sessionVar) {
            return <Redirect to="/login" />
        }
        if (this.state.newPage) {
            //Redirecting to the final booking page to review all the bookings
            return <Redirect
                to={{
                    pathname: "/FinalBooking",
                    state: {
                        package: this.state.package,
                        checkInDate: this.state.bookingForm.checkInDate,
                        checkOutDate: this.state.checkOutDate
                    }
                }
                }
            />
        }

        return (

            <div>
                {/* creating form for booking the selected package */}
                {/* Displaying success or error messsages*/}
                {!sessionStorage.getItem("userId") ? <div>{this.handleSession()}</div> : null}
                <h4 className="itineraryAbout text-success text-left">**Charges per person: Rs. {selectedDeal.chargesPerPerson}</h4>
                <form onSubmit={this.handleSubmit} className="form text-left">
                    <div className="form-group">
                        <TextField
                            required
                            label="Number Of Travelers"
                            type="number"
                            id="noOfPersons"
                            className="form-control"
                            name="noOfPersons"
                            variant='outlined'
                            value={this.state.bookingForm.noOfPersons}
                            onChange={this.handleChange}
                        />
                    </div>
                    {this.state.bookingFormErrorMessage.noOfPersons ?
                        <span className="text-danger">{this.state.bookingFormErrorMessage.noOfPersons}</span>
                        : null}
                    <br />

                    <div className="form-group">
                        <TextField
                            required
                            label="Trip Start Date"
                            variant='outlined'
                            type={this.state.type}
                            onClick={this.handleClick}
                            id="checkInDate"
                            className="form-control"
                            name="checkInDate"
                            value={this.state.bookingForm.checkInDate}
                            onChange={this.handleChange}
                        /></div>
                    {this.state.bookingFormErrorMessage.checkInDate ?
                        <span className="text-danger">{this.state.bookingFormErrorMessage.checkInDate}</span>
                        : null}<br />

                    <div className="form-group">
                        <label>Include Flights:</label>&nbsp;
                        <Switch name="flights" id="flights"
                            checked={this.state.bookingForm.flights}
                            onChange={this.handleChange}
                            inputProps={{ 'aria-label': 'primary' }} />
                    </div>

                    <div className="form-group">
                        <Button
                            id="buttonCalc"
                            color='secondary'
                            variant='outlined'
                            type="submit"
                            onClick={this.handleCalculateCharges}
                            disabled={!this.state.bookingFormValid.buttonActive}
                        >Calculate Charges</Button>
                    </div>
                </form>
                {this.state.totalCharges ?
                    (
                        <div className="text-left">
                            <h4 className="text-success text-left">
                                Your trip ends on {this.state.checkOutDate} and
                                    you will pay ${this.state.totalCharges}
                            </h4>
                        </div>
                    )
                    : null}

                <div className="text-center">
                    <Button
                        variant='contained'
                        color='primary'
                        disabled={!this.state.bookEnable}
                        onClick={this.handleConfirmation}
                    >Book</Button>&nbsp;
                </div>
                {this.state.errorMessage ? (<span className="text-danger">
                    {this.state.errorMessage}
                </span>)
                    : null}
                {/* confirming the booking */}
                <Dialog
                    open={this.state.confirmation}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    TransitionComponent={Slide}
                    style={{ fontSize: 50 }}>
                    <DialogTitle>
                        Trip to <b>{this.props.package.name}</b>
                    </DialogTitle>
                    <DialogContentText id="alert-dialog-description">
                        <div className="text-success" style={{ paddingLeft: '20px' }}>
                            <h6>Trip starts on: {this.state.bookingForm.checkInDate}</h6>
                            <h6>Trip ends on: {this.state.checkOutDate}</h6>
                        </div>
                    </DialogContentText>
                    <DialogActions>
                        <Button variant='contained' autoFocus onClick={this.handleBookButton} color="secondary">
                            Confirm Booking
                        </Button>
                        <Button color="secondary" variant='contained' onClick={() => { this.setState({ confirmation: false }) }} >
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
export default Book;