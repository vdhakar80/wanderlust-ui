import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SearchIcon from "@material-ui/icons/Search"
import HotDeals from './HotDeals';
import { pulse } from 'react-animations';
import Radium, { StyleRoot } from 'radium';


const styles = {
    pulse: {
        animation: 'x 1s',
        animationName: Radium.keyframes(pulse, 'pulse')
    }
}


class Home extends Component {
    state = {

        packagePage: false,
        successMessage: "",
        homePage: "",
        emailId: "",
        continent: ""
    };

    handleChange = (event) => {
        /**
        * handling the change on the search and subscribe textField
        * configuring the ENTER key button for searching and subscribing
        */
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value })
        if (event.keyCode === 13) {
            this.setState({ packagePage: true })
        }
    }

    handleClick = (event) => {
        /**
         * Preventing whole page from refreshing 
         * configuring the ENTER key button for searching and subscribing
         */
        event.preventDefault();
        if (this.state.emailId === "") {
            this.setState({ successMessage: "Enter an Email Id" })
        } else {
            this.setState({ successMessage: "Thank you for subscribing. Updates will be sent to the subscribing Email ID" });
        }
    }

    handleClickSearch = () => {
        this.setState({ packagePage: true })
    }



    render() {

        if (this.state.packagePage) {
            // Rendering to the searched package 
            let str = "/packages/" + this.state.continent;
            return <Redirect to={str} push></Redirect>
        }
        return (
            <div>
                <header className="masthead book-page" id="page-top">
                    <div className="container d-flex h-100 align-items-center">
                        <div className="mx-auto text-center">
                            <StyleRoot>

                                <h1 className="mx-auto my-0 text-uppercase zoom" style={styles.pulse}>Wanderlust</h1>

                            </StyleRoot>

                            <h2 className="text-white-50 mx-auto mt-2 mb-5">All that is gold does not glitter,
                    Not all those who wander are lost.</h2>
                            <div className="form-inline d-flex">
                                <input
                                    type="text"
                                    className="form-control-lg flex-fill"
                                    name="continent"
                                    onKeyUp={this.handleChange}
                                    id="continent"
                                    placeholder="Where?"
                                />&nbsp;
                                <SearchIcon style={{ fontSize: 60, color: "white" }} onClick={this.handleClickSearch} />

                            </div>
                        </div>
                    </div>
                </header>

                <section id="about" className="about-section text-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mx-auto">
                                <h2 className="text-white mb-4">Unleash the traveller inside you</h2>
                                <p className="about-paragraph text-center">When someone makes a travel plan, the first few things they want to sort out, are flights, accommodation, and other amenities for a convenient holiday.
                                To enjoy holidays, you want to have the basics taken care of, especially for family vacations and honeymoon trips.
                                You want your accommodation, return flight bookings, meals of the days, and other traveling formalities sorted beforehand.
                                At <a href="/">Wanderlust</a>, we take care of all the requirements to ensure that you get to enjoy the best of your holiday, exploring and experiencing the destination.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="hotDeals" className="hotDeals-section">
                    {/*Rendering the availaible hotdeals */}
                    <HotDeals />
                </section>

                <section id="signup" className="signup-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 col-lg-8 mx-auto text-center">
                                <h2 className="text-white mb-5">Subscribe to receive updates!</h2>
                                <form className="form-inline d-flex">
                                    <input
                                        type="email"
                                        className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0"
                                        id="inputEmail"
                                        name="emailId"
                                        value={this.state.emailId}
                                        onChange={this.handleChange}
                                        placeholder="Enter email address..."
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-primary mx-auto"
                                        onClick={this.handleClick}
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                        </div>
                        <br />
                        {this.state.successMessage ?
                            <span className="text-warning text-center">{this.state.successMessage}</span> :
                            null}
                    </div>
                </section>
                {/* creating the contact section  */}
                {/* using animation to show the contact details */}

                <section className="contact-section bg-black">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 mb-2 mb-md-0">
                                <div className="card zoom py-4 h-100">
                                    <div className="card-body text-center">
                                        <h4 className="text-uppercase m-0">Vicky Dhakar</h4>
                                        <hr className="my-4" />
                                        <div className="small text-black-50"><a href="/home">vicky.dhakar@infosys.com</a></div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3 mb-2 mb-md-0">
                                <div className="card zoom py-4 h-100">
                                    <div className="card-body text-center">
                                        <h4 className="text-uppercase m-0">Shivangi Gupta</h4>
                                        <hr className="my-4" />
                                        <div className="small text-black-50"><a href="/home">shivangi.gupta09@infosys.com</a></div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3 mb-2 mb-md-0">
                                <div className="card zoom py-4 h-100">
                                    <div className="card-body text-center">
                                        <h4 className="text-uppercase m-0">Ritu Kumawat</h4>
                                        <hr className="my-4" />
                                        <div className="small text-black-50"><a href="/home">ritu.kumawat@infosys.com</a></div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-3 mb-2 mb-md-0">
                                <div className="card zoom py-4 h-100">
                                    <div className="card-body text-center">
                                        <h4 className="text-uppercase m-0">Mansi Sawaj</h4>
                                        <hr className="my-4" />
                                        <div className="small text-black-50"><a href="/home">mansi.sawaj@infosys.com</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        )
    }
}

export default Home;