import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
/**Importing necessary modules */
import Login from './components/login';
import Home from './components/home';
import HotDeals from './components/HotDeals';
import Register from './components/register';
import SearchedPackages from './components/SearchedPackages';
import Logout from './components/Logout';
import ViewBookings from './components/ViewBookings';
import FinalBooking from './components/FinalBooking';
import Avtar from '@material-ui/core/Avatar'


class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="App ">
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">
              <div className="navbar-header">
                <Link className="navbar-brand" to="/">
                  <img
                    src={process.env.PUBLIC_URL + '/assets/logo.png'}
                    alt="Wandering"
                    className="App-logo" />
                  Start Wandering</Link>
              </div>
              <ul className="navbar-nav ml-auto">
                {sessionStorage.getItem("userId") ? <li className="nav-item">
                  <Avtar style={{backgroundColor:"#e91e63"}}>{sessionStorage.getItem("userName").charAt(0).toUpperCase()}</Avtar>
                </li> : null}
                {sessionStorage.getItem("userId") ? <li className="nav-item">
                  <Link className="nav-link" to="">
                    Welcome {sessionStorage.getItem("userName")}</Link>
                </li> : null}
                <li className="nav-item">
                  <Link className="nav-link" to="/packages">Hot Deals </Link>
                </li>

                {sessionStorage.getItem("userId") ? <li className="nav-item">
                  <Link className="nav-link" to="/viewBookings">Planned Trips</Link>
                </li> : null}
                {sessionStorage.getItem("userId") ? <li className="nav-item">
                  <Link className="nav-link" to="/logout">Logout</Link>
                </li> : <li className="nav-item">
                    <Link className="nav-link" to="/login"> Login</Link>
                  </li>}
              </ul>
            </nav>
            {/* All the necessary routes */}
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/logout" component={Logout}></Route>
              <Route exact path="/home/:userId" component={Home}></Route>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/packages" component={HotDeals}></Route>{/* Only HotDeals*/}
              <Route exact path="/packages/:continent" component={SearchedPackages}></Route>{/* Destinations with search*/}
              <Route exact path="/viewBookings" component={ViewBookings}></Route>
              <Route exact path="/finalBooking" component={FinalBooking}></Route>
              <Route exact path="*" render={() => <Redirect to='/home'/>}/>

              viewPackge
            </Switch>
          </div>
        </Router>
        <footer className="bg-black text-center text-white-50">
          Copyright &copy; www.eta.wanderlust.com 2021
    </footer>
      </div>
    );
  }
}

export default App;
