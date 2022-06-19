import React, { Component } from "react";
import axios from "axios";
/*necessary imports */
import { Redirect } from 'react-router-dom';
import { backendUrlUser } from '../BackendURL';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PhoneIcon from '@material-ui/icons/Phone'
import LockIcon from '@material-ui/icons/Lock'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import { InputAdornment, TextField } from "@material-ui/core";

/*The following code is to login the user */

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginform: {
                contactNo: "",
                password: ""
            },
            loginformErrorMessage: {
                contactNo: "",
                password: ""
            },
            loginformValid: {
                contactNo: false,
                password: false,
                buttonActive: false
            },
            successMessage: "",
            errorMessage: "",
            loadHome: false,
            loadRegister: false,
            userId: ""
        }
    }

    handleClick = () => {
        this.setState({ loadRegister: true })
    }

    /**
     * handling the change on the form fields 
     * calling the validate method to check the validation
     */
    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const { loginform } = this.state;
        this.setState({
            loginform: { ...loginform, [name]: value }
        });
        this.validateField(name, value);
    }

    login = () => {
        /* 
            Make aN axios POST request to with form data 
            and handle success and error cases 
        */
        const { loginform } = this.state;
        axios.post(backendUrlUser + '/login', loginform)
            .then(response => {
                console.log(response);
                let userId = response.data.userId;
                sessionStorage.setItem("contactNo", response.data.contactNo);
                sessionStorage.setItem("userId", userId);
                sessionStorage.setItem("userName", response.data.name);
                this.setState({ loadHome: true, userId: userId }, () => {
                    window.location.reload();
                })


            }).catch(error => {
                console.log(error);
                if (error.response) {
                    this.setState({ errorMessage: error.response.data.message })
                } else {
                    this.setState({ errorMessage: error.message })
                }

            })
    }

    handleSubmit = (event) => {
        /**
         * Prevents the whole page from refreshing
         * calling the login function
         */
        event.preventDefault();
        this.login();
    }

    
    /*
    * Validating the input values of the form
    * handling the error message if validation fails
    * handling the disability of the signIn button
    */
    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.loginformErrorMessage;
        let formValid = this.state.loginformValid;
        switch (fieldName) {
            case "contactNo":
                let cnoRegex = /^[1-9]\d{9}$/
                if (!value || value === "") {
                    fieldValidationErrors.contactNo = "Please enter your contact Number";
                    formValid.contactNo = false;
                } else if (!value.match(cnoRegex)) {
                    fieldValidationErrors.contactNo = "Contact number should be a valid 10 digit number";
                    formValid.contactNo = false;
                } else {
                    fieldValidationErrors.contactNo = "";
                    formValid.contactNo = true;
                }
                break;
            case "password":
                let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{7,20}$/
                if (!value || value === "") {
                    fieldValidationErrors.password = "Password is mandatory";
                    formValid.password = false;
                } else if (!value.match(passRegex)) {
                    fieldValidationErrors.password = "Please Enter a valid password"
                    formValid.password = false;
                } else {
                    fieldValidationErrors.password = "";
                    formValid.password = true;
                }
                break;
            default:
                break;
        }
        formValid.buttonActive = formValid.contactNo && formValid.password;
        this.setState({
            loginformErrorMessage: fieldValidationErrors,
            loginformValid: formValid,
            successMessage: ""
        });
    }

    render() {
        if (this.state.loadHome === true) return <Redirect to={'/home/' + this.state.userId} />
        if (this.state.loadRegister === true) return <Redirect to={'/register'} />  //Redirecting to the register page if clicked on register button
        return (
            <div className="signup-section">
                {/* creating form for logging in */}
                {/* Displaying success or error messages  */}
                <div className="container-fluid">
                    <div className="col-md-4 offset-4" >
                        <div className="card  bg-card " style={{ backgroundColor: 'white' }}>
                            <img src={process.env.PUBLIC_URL + '/assets/lono-final.png'} alt="Wandering" className="logo col-md-9" />
                            <div className="card-body text-left loginBody">
                                <div className="text-center"><AccountCircleIcon style={{ fontSize: 70 }} /></div><br />
                                <form className="form loginForm" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <TextField
                                            type="number"
                                            value={this.state.loginform.contactNo}
                                            onChange={this.handleChange}
                                            id="uContactNo"
                                            name="contactNo"
                                            size="medium"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PhoneIcon />
                                                    </InputAdornment>
                                                )
                                            }}
                                            className="form-control"
                                            placeholder="EX-9876543210"
                                        />

                                        {this.state.loginformErrorMessage.contactNo ? (<span className="text-danger">
                                            {this.state.loginformErrorMessage.contactNo}
                                        </span>)
                                            : null}
                                    </div><br />

                                    <div className="form-group">
                                        <TextField
                                            type="password"
                                            value={this.state.loginform.password}
                                            onChange={this.handleChange}
                                            id="uPass"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LockIcon />
                                                    </InputAdornment>
                                                )
                                            }}
                                            name="password"
                                            className="form-control"
                                            placeholder="Expl@123"
                                        />

                                        {this.state.loginformErrorMessage.password ? (<span className="text-danger">
                                            {this.state.loginformErrorMessage.password}
                                        </span>)
                                            : null}
                                    </div>

                                    <div className="form-group">
                                        <div className="text-danger">
                                            <h6>{this.state.errorMessage}</h6>
                                        </div>
                                    </div><br />

                                    <div className="form-group">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            disabled={!this.state.loginformValid.buttonActive}
                                            style={{ backgroundColor: "black", color: "white" }}
                                        >Sign In</Button>
                                    &nbsp;
                                                <Button
                                            type="button"
                                            variant="contained"
                                            style={{ backgroundColor: "black", color: "white" }}
                                            onClick={this.handleClick}
                                            endIcon={<PersonAddIcon />} >Click here for Sign Up</Button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;