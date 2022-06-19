import React from 'react';


let OverView = (props) => {
    /*
      using Functional Component for displaying the overview details of thye selected package
    */
    let pack = props.package;
    let PI = pack.details.itinerary.packageInclusions
    let viewPackageInclusions = () => {
        if (PI) {
            return PI.map((packIn, index) => (<li key={index}>{packIn}</li>))
        } else {
            return null;
        }
    }
    
    return (
        <div>
            {/* Rendering the packageInclusion inside the Drawer */}
            <div style={{ display: "flex", justifyContent: 'space-between', flexWrap: 'wrap', marginTop: '20px' }}>

                <div className="col-md-6 text-center">
                    <img className="package-image" alt="destination comes here" src={process.env.PUBLIC_URL + `${pack.imageUrl}`} />
                </div>

                <div className="col-md-6 text-left">
                    <h4>Package Includes:</h4>
                    <ul>
                        {viewPackageInclusions()}
                    </ul>
                </div>
                <div className="text-justify itineraryAbout">
                    <h4>Tour Overview:</h4>
                    {pack.details.about}
                </div>
            </div>
        </div>
    )
}
export default OverView;