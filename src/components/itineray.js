import React from 'react'
import { Link} from 'react-router-dom';



export default function Itineray(props) {
    /**
     * Using Functional Component to display the day wise details of the selected package
     */
    let pack = props.package
    let daywiseDetails = pack.details.itinerary.dayWiseDetails;
    let tourDays = () => {
        let tourArray = [];
        tourArray.push(<div><h5>Day 1</h5><p>{daywiseDetails.firstDay}</p></div>);
        for (let i = 0; i < daywiseDetails.restDaysSightSeeing.length; i++) {
            tourArray.push(<div><h5>Day {i + 2}</h5><p>{daywiseDetails.restDaysSightSeeing[i]}</p></div>)
        }
        tourArray.push(<div><h5>Day {daywiseDetails.restDaysSightSeeing.length + 2}</h5><p>{daywiseDetails.lastDay}</p></div>)
        return tourArray;
    }
    return (
        <div>
            {/* Rendering the day wise details of the package  */}
            { tourDays()}
            <div className="text-danger">
                **This itinerary is just a suggestion, itinerary can be modified as per requirement.
                 <Link
                    to="/contactUs">Contact us</Link> for more details.
                        </div>
        </div>
    )
}
