import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { backendUrlUser } from "../BackendURL";
/*Necessary imports for using material-ui and styling on the page*/
import { Button, Grid } from "@material-ui/core";
//import "../css/register.css"
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import LockIcon from '@material-ui/icons/Lock'
import PersonIcon from '@material-ui/icons/Person'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import { TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert"

/*The Following program is to Register on the Website*/

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            registerForm: {
                name: "",
                emailId: "",
                contactNo: "",
                password: ""
            },
            registerformErrorMessage: {
                name: "",
                emailId: "",
                contactNo: "",
                password: ""
            },
            registerformValid: {
                name: false,
                emailId: false,
                contactNo: false,
                password: false,
                buttonactive: false
            },
            successMessage: "",
            errorMessage: "",
            loadLogin: false
        }
    }

    /*
    * Validating the input values of the form
    * handling the error message if validation fails
    * handling the disability of the signUp button
    */
    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.registerformErrorMessage;
        let formValid = this.state.registerformValid;
        switch (fieldName) {
            case "name":
                let nameRegex = /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/
                if (!value || value === "") {
                    fieldValidationErrors.name = "Please enter your Name"
                    formValid.name = false
                } else if (!value.match(nameRegex)) {
                    fieldValidationErrors.name = "Name field must contains only alphabets."
                    formValid.name = false
                } else {
                    fieldValidationErrors.name = ""
                    formValid.name = true
                }
                break;
            case "emailId":
                let emailRegex = /^[a-z]+[@][a-z]+\.[com]+$/
                if (!value || value === "") {
                    fieldValidationErrors.emailId = "Please enter your Email-Id"
                    formValid.emailId = false
                } else if (!value.match(emailRegex)) {
                    fieldValidationErrors.emailId = "Please enter a valid Email-Id."
                    formValid.emailId = false
                } else {
                    fieldValidationErrors.emailId = ""
                    formValid.emailId = true
                }
                break;
            case "contactNo":
                let contactRegex = /^[1-9]\d{9}$/
                if (!value || value === "") {
                    fieldValidationErrors.contactNo = "Please Enter Your Contact Number"
                    formValid.contactNo = false
                } else if (!value.match(contactRegex)) {
                    fieldValidationErrors.contactNo = "Please Enter a Valid 10 digit Contact Number."
                    formValid.contactNo = false
                } else {
                    fieldValidationErrors.contactNo = ""
                    formValid.contactNo = true
                }
                break;
            case "password":
                let passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{7,20}$/
                if (!value || value === "") {
                    fieldValidationErrors.password = "Password Field is Mandatory"
                    formValid.password = false
                } else if (!value.match(passRegex)) {
                    fieldValidationErrors.password = "Please Enter a Valid Password.Password should be of 7 to 20 charcters length and  consist of atleast one uppercase, one lowercase, one digit ,one special character"
                    formValid.password = false
                } else {
                    fieldValidationErrors.password = ""
                    formValid.password = true
                }
                break;
            default:
                break;
        }
        formValid.buttonactive = formValid.contactNo && formValid.password && formValid.emailId && formValid.name;
        this.setState({
            registerformErrorMessage: fieldValidationErrors,
            registerformValid: formValid,
            successMessage: ""
        })
    }

    /**
     * handling the change on the form fields 
     * calling the validate method to check the validation
     */
    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const { registerForm } = this.state;
        this.setState({
            registerForm: { ...registerForm, [name]: value }
        });
        this.validateField(name, value);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.register()
    }

    register = () => {
        /* 
        *  Make aN axios POST request to with form data 
        *  and handle success and error cases 
        */
        let { registerForm } = this.state
        axios.post(backendUrlUser + '/register', registerForm).then((res) => {
            this.setState({
                successMessage: "Registration Is Successful!"
            })
        }).catch((error) => {
            if (error.response) {
                this.setState({
                    errorMessage: error.response.data.message
                })
            } else {
                this.setState({
                    errorMessage: error.message
                })
            }
        })
    }


    render() {
        // Redirecting to the login page if registration is Successful
        if (this.state.loadLogin === true) return <Redirect to={'/login'} />
        if (this.state.successMessage) {
            return (
                <section id="registerPage" className="registerSection">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4 offset-4">
                                <div className="card ">
                                    <div className="card-body">
                                        <h4><Alert style={{ fontSize: 20 }} severity="success">{this.state.successMessage}</Alert></h4>
                                        <h3><a href="/login">Click here to Login</a></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
        return (
            <div>
                <section id="registerPage" className="signup-section">
                    {/* creating form for registration */}
                    {/* Displaying success or error messages  */}
                    <div className="container-fluid " style={{ margin: '20px 0px', display: 'flex', justifyContent: 'center' }}>
                        <div className="" style={{ width: '380px' }} >
                            <div className="card bg-card">
                                <img src={process.env.PUBLIC_URL + '/assets/lono-final.png'} alt="Wandering" className="logo col-md-9" />
                                <div className="card-body text-left registerBody">
                                    <h1 className=" registerHeader"><AccountBoxIcon style={{ fontSize: 50 }} /><br /><b>Sign Up</b></h1><br />
                                    <form className="form registerForm" onSubmit={this.handleSubmit}>
                                        <div className="form-group   ">
                                            <Grid container spacing={1} alignItems="flex-end" style={{ width: '100%' }}>
                                                <Grid item >
                                                    <PersonIcon />
                                                </Grid>
                                                <Grid item style={{ width: '90%' }}>
                                                    <TextField
                                                        required
                                                        value={this.state.registerForm.name}
                                                        type="text"
                                                        onChange={this.handleChange}
                                                        className="form-control "
                                                        name="name"
                                                        label="Name"
                                                        id="name"
                                                        placeholder="EX-John"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        {this.state.registerformErrorMessage.name ? (<span className="text-danger">
                                            {this.state.registerformErrorMessage.name}
                                        </span>)
                                            : null}

                                        <div className="form-group">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <EmailIcon />
                                                </Grid>
                                                <Grid item style={{ width: '90%' }}>
                                                    <TextField
                                                        required
                                                        value={this.state.registerForm.emailId}
                                                        type="email"
                                                        onChange={this.handleChange}
                                                        className="form-control"
                                                        name="emailId"
                                                        id="emailId"
                                                        label="Email-Id"
                                                        placeholder="EX-abc@gmail.com" />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        {this.state.registerformErrorMessage.emailId ? (<span className="text-danger">
                                            {this.state.registerformErrorMessage.emailId}
                                        </span>)
                                            : null}

                                        <div className="form-group">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <PhoneIcon />
                                                </Grid>
                                                <Grid item style={{ width: '90%' }}>
                                                    <TextField
                                                        required
                                                        value={this.state.registerForm.contactNo}
                                                        type="number"
                                                        onChange={this.handleChange}
                                                        className="form-control"
                                                        name="contactNo"
                                                        id="contactNo"
                                                        label="Contact No."
                                                        placeholder="EX-9898096534" />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        {this.state.registerformErrorMessage.contactNo ? (<span className="text-danger">
                                            {this.state.registerformErrorMessage.contactNo}
                                        </span>)
                                            : null}

                                        <div className="form-group">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item >
                                                    <LockIcon />
                                                </Grid>
                                                <Grid item style={{ width: '90%' }}>
                                                    <TextField
                                                        required
                                                        value={this.state.registerForm.password}
                                                        type="password"
                                                        onChange={this.handleChange}
                                                        className="form-control"
                                                        name="password"
                                                        label="Password"
                                                        id="password"
                                                        placeholder="EX-Xyz@123!" />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        {this.state.registerformErrorMessage.password ? (<span className="text-danger">
                                            {this.state.registerformErrorMessage.password}
                                        </span>)
                                            : null}<br />

                                        <span className="regMark"><span className="text-danger ">*</span> Marked Fields are Mandatory!</span><br /><br />
                                        <Button
                                            variant="contained"
                                            style={{ backgroundColor: "black", color: "white" }}
                                            type="submit"
                                            endIcon={<PersonAddIcon />}

                                            disabled={!this.state.registerformValid.buttonactive}>Sign Up</Button>
                                        {this.state.errorMessage ? (<span className="text-danger">
                                            {this.state.errorMessage}
                                        </span>)
                                            : null}
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        )
    }
}

export default Register;