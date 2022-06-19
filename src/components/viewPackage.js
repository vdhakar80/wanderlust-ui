import React, { Component } from 'react';
/*necessary imports */
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { AppBar } from '@material-ui/core';
import Book from "./book"
import Itinerary from './itineray';
import OverView from './OverView';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';



class ViewPackage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bookingPage: false,
            showItinerary: false,
            selectedDeal: "",
            index: "",
            package: this.props.package,
            expand: false
        }
    }

   

    getSelectedDeal = (selectedPackage) => {
        this.setState({ index: 0, selectedDeal: selectedPackage, showItinerary: true })
    }

    openingBook = (selectedPackage) => {
        this.setState({ index: 2, selectedDeal: selectedPackage, showItinerary: true })
    }


    handleTabChange = (event, newIndex) => {
        this.setState({ index: newIndex })
    }

    handleExpandClick = () => {
        this.setState({expand:!this.state.expand})
    }

    // display packages inside the cards 
    viewPackage = () => {
        let singlePackage = this.props.package;

       let expand = {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
          }
       let  expandOpen = {
            transform: 'rotate(180deg)',
            marginLeft: 'auto',
          }
          
        return (
            <div className=" text-dark" key={singlePackage.destinationId}>
                <div className="col-md-8" >
                    <Card
                        style={{width: 400, marginBottom:'20px'}}
                        className=" container-fluid "
                    >
                        <CardHeader
                            key={singlePackage.destinationId}
                            title={singlePackage.name}
                        />
                        <Typography component={'span'} className="badge-info badge" style={{ fontSize: 15 }}>
                            {singlePackage.noOfNights}<em> Nights</em>
                        </Typography>
                        <CardMedia
                            style={{
                                height: 0,
                                paddingTop: '56.25%'
                            }}
                            image={process.env.PUBLIC_URL + `${singlePackage.imageUrl}`}
                            title={singlePackage.name}
                        />

                        <CardContent>
                            <Typography component={'span'} variant="body2" color="textSecondary" >

                                {singlePackage.discount ? <div className="discount text-danger">{singlePackage.discount}% Instant Discount</div> : null}
                                <h4>Prices Starting From:</h4>
                                <div className="text-center text-success"><h6>${singlePackage.chargesPerPerson}</h6></div><br /><br />
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <div><Button className="btn btn-primary book"
                                name="viewDetailsPage"
                                variant='contained'
                                color='primary'
                                value={true}
                                onClick={() => this.getSelectedDeal(singlePackage)}
                            >View Details</Button></div>&nbsp;
                            <div>
                                <Button
                                    className="btn btn-primary book"
                                    name="bookPage"
                                    color='primary'
                                    variant='contained'
                                    value={true}
                                    onClick={() => this.openingBook(singlePackage)}
                                >Book </Button>
                            </div>
                            <IconButton
                                style={this.state.expand ? expand : expandOpen}
                                onClick={this.handleExpandClick}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse
                        
                            in={this.state.expand}
                            timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography component={'span'} variant='body1' >
                                    <span className="text-dark mb-0">{singlePackage.details.about}</span>
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div >
               
                {this.viewPackage()}
              
               
                <div>
                    {/* the following code is to render the side drawer  */}
                    <Drawer open={this.state.showItinerary}
                        anchor="right" onClose={() => { this.setState({ showItinerary: false }) }}
                    >
                        <CloseIcon style={{ fontSize: 20, position: 'right' }} onClick={() => { this.setState({ showItinerary: false }) }} />
                        <div style={{ width: "750px", padding: '10px' }}> <h2>{this.state.selectedDeal.name}</h2>
                            <AppBar position="static">
                                <Tabs value={this.state.index} onChange={this.handleTabChange} >
                                    <Tab label="Overview" />
                                    <Tab label="Itenerary" />
                                    <Tab label="Book" />
                                </Tabs>
                            </AppBar>
                            {this.state.index === 0 ? <OverView package={this.state.package} /> : null}
                            {this.state.index === 1 ? <Itinerary package={this.state.package} /> : null}
                            {this.state.index === 2 ? <Book package={this.state.package} /> : null}
                        </div>
                    </Drawer>
                </div>
            </div>
        )
    }
}
export default ViewPackage;