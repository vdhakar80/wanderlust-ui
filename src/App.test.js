import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './components/home'
import SearchedPackage from './components/SearchedPackages'
import ViewBookings from './components/ViewBookings';
import Book from './components/book';
import HotDeals from './components/HotDeals'
import Register from './components/register';
import Booking from './components/Booking';
import Login from './components/login';
import ViewPackage from './components/viewPackage'
import { mount } from 'enzyme';
let dest={
  "destinationId" : "D1001",
  "continent":"Europe",
  "imageUrl":"/assets/geece.jpg",
  "name" : "A Week in Greece: Athens, Mykonos & Santorini",
  "details" : {
      "about" : "Watch the setting sun from the hilltops of Greece’s most famous islands.Experience ancient history and open-air museums in the capital of Athens. Then, the quintessential, beautiful Greek islands you’ve been dreaming of come to life on the isles of Mykonos and Santorini.",
      "itinerary" : {
          "dayWiseDetails":{
                  "firstDay":"Travel day: Board your overnight flight to Athens.",
                  "restDaysSightSeeing":[
                                          "Santorini",
                                          "Acropolis", 
                                          "Parthenon", 
                                          "Temple of Apollo", 
                                          "Ruins of Olympia", 
                                          "Ancient Theater of Epidaurus"
                                      ],
                  "lastDay":"Departure:Transfer to the airport for your flight home."
          },
          "packageInclusions" : [ 
              "7 nights in handpicked hotels", 
              "7 breakfasts", 
              "3 dinners with beer or wine", 
              "3 guided sightseeing tours", 
              "Expert tour director & local guides", 
              "Private deluxe motor coach"
          ],
          "tourHighlights" : [ 
              "Greece",
              "Athens",
              "Mykonos",
              "Santorini",
              "Acropolis", 
              "Parthenon", 
              "Temple of Apollo", 
              "Ruins of Olympia", 
              "Ancient Theater of Epidaurus", 
              "Corinth Canal photo stop"
          ],
          "tourPace" : [ 
              "On this guided tour, you will walk for about 2 hours daily across uneven terrain, including paved roads and unpaved trails, with some hills and stairs."
          ]
      }
  },
  "noOfNights" : 7.0,
  "flightCharges":500,
  "chargesPerPerson" : 2499.0,
  "discount" : 0.0,
  "availability":30
}
let bookingData={
  "_id": {
    "$oid": "6087d70afbdb0c352c148197"
  },
  "checkInDate": {
    "$date": "2021-04-28T00:00:00.000Z"
  },
  "checkOutDate": {
    "$date": "2021-05-16T18:30:00.000Z"
  },
  "bookingId": "B1004",
  "destId": "HD1002",
  "userId": "U1003",
  "destinationName": "Australia & New Zealand",
  "noOfPersons": 2,
  "totalCharges": 12158.1,
  "__v": 0
}
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
describe("testing app.js file", () => {
  test("checking for navbar", () => {
    const wrapper = mount(<App></App>)
    expect(wrapper.find('nav').length).toEqual(1);
  })
  test("checking for navbar header", () => {
    const wrapper = mount(<App></App>)
    expect(wrapper.find('.navbar-header').length).toEqual(1);
  })
  test("checking for Switch", () => {
    const wrapper = mount(<App></App>)
    expect(wrapper.find('Switch').length).toEqual(1);
  })
  test("checking for Redirect", () => {
    const wrapper = mount(<App></App>)
    expect(wrapper.find('Redirect').length).toEqual(0);
  })
  test("checking for Route", () => {
    const wrapper = mount(<App></App>)
    expect(wrapper.find('Route').length).toEqual(1);
  })
  test("checking for Router", () => {
    const wrapper = mount(<App></App>)
    expect(wrapper.find('Router').length).toEqual(1);
  })
  test("checking for navbar nav", () => {
    const wrapper = mount(<App></App>)
    expect(wrapper.find('.navbar-nav').length).toEqual(1);
  })
  test("checking for navbar link", () => {
    const wrapper = mount(<App></App>)
    expect(wrapper.find('.nav-link').length).not.toEqual(0);
  })
})


describe("testing viewpackage.js file", () => {
  test("checking for Drawer", () => {
    const wrapper = mount(<Home/>)
    expect(wrapper.find('header').length).toEqual(1);
  })
  test("checking for abouts", () => {
    const wrapper = mount(<Home/>)
    expect(wrapper.find('#about').length).toEqual(1);
  })
  test("checking for Redirect", () => {
    const wrapper = mount(<Home/>)
    expect(wrapper.find('Redirect').length).toEqual(0);
  })
 
  test("checking for class ", () => {
    
    const wrapper = mount(<ViewPackage package={dest}/>)
    expect(wrapper.find('.text-dark').length).toEqual(1);
  })
  
  test("checking for showItinerary state", () => { 
    const wrapper = mount(<ViewPackage package={dest}/>)
    expect(wrapper.state().showItinerary).toEqual(false);
  })
  
})

describe("testing viewpackage.js file", () => {
  test("checking for signup section", () => {
    const wrapper = mount(<Login/>)
    expect(wrapper.find('.signup-section').length).toEqual(1);
  })
  test("checking for form group class", () => {
    const wrapper = mount(<Login/>)
    expect(wrapper.find('.form-group').length).toEqual(4);
  })
  test("checking for showItinerary state", () => { 
    const wrapper = mount(<Login/>)
    expect(wrapper.state().loadHome).toEqual(false);
  })
  test("checking for loadHome state", () => { 
    const wrapper = mount(<Login/>)
    expect(wrapper.state().loadHome).toEqual(false);
  })
})

describe("testing viewpackage.js file", () => {
  test("checking for register Section", () => {
    const wrapper = mount(<Register/>)
    expect(wrapper.find('.registerSection').length).toEqual(0);
  })
  test("checking for register Page id", () => {
    const wrapper = mount(<Register/>)
    expect(wrapper.find('#registerPage').length).toEqual(1);
  })
  test("checking for load login state", () => { 
    const wrapper = mount(<Register/>)
    expect(wrapper.state().loadLogin).toEqual(false);
  })
  test("checking for form group class", () => {
    const wrapper = mount(<Register/>)
    expect(wrapper.find('.form-group').length).toEqual(4);
  })
  test("checking for changing state", () => {
    const wrapper = mount(<Register/>)
    wrapper.instance().setState({successMessage:"success"})
    expect(wrapper.state().successMessage).toEqual("success")
  })
})

describe("testing booking.js file", () => {
  test("checking for card", () => {
    const wrapper = mount(<Booking booking={bookingData}/>)
    expect(wrapper.find('.card').length).toEqual(1);
  })
  test("checking for card header", () => {
    const wrapper = mount(<Booking booking={bookingData}/>)
    expect(wrapper.find('.card-header').length).toEqual(1);
  })
  test("checking for button", () => {
    const wrapper = mount(<Booking booking={bookingData}/>)
    expect(wrapper.find('Button').length).toEqual(0);
  })
  
})







