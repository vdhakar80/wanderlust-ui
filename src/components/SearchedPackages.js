import React, { Component } from 'react';
import ViewPackage from './viewPackage';
import axios from 'axios';
import { backendUrlGetPackage } from "../BackendURL";

class SearchedPackages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            packages: []
        }
    }

    fetchPackages = () => {
        /* 
            Make aN axios GET request to fetch the searched packages
        */
        let url = backendUrlGetPackage + this.props.match.params.continent;
        axios.get(url).then(res => {
            this.setState({ packages: res.data })
        }).catch(err => {
            if (err.response) {
                this.setState({ packages: [] })
            }
            else {
                this.setState({ packages: [] })
            }
        })
    }

    componentDidMount = () => {
        this.fetchPackages()
    }
    
    /**
     * Rendering the searched package
     * If no packages availaible giving a message
     */
    render() {
        return (
            <React.Fragment>
                <div className="mt-5" style={{display:'flex',justifyContent:'center', flexWrap:'wrap'}}>
                    {this.state.packages.length > 0 ?
                        this.state.packages.map(singlePackage => <ViewPackage package={singlePackage} />) :
                        <div className="text-center">
                            <h1 className="text-danger">Sorry we don't operate in this Destination</h1>
                    </div> }
                        
                </div>

            </React.Fragment>
        )
    }

}

export default SearchedPackages;













































