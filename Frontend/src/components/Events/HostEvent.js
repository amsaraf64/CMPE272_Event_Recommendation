import React,{Component} from 'react';
import NavBarBlue from '../NavBarBlue/NavBarBlue';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateEvent } from "../../actions";
import swal from 'sweetalert'
import jwtdecode from 'jwt-decode';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import './HostEvent.css'

//create the Landing Component
class HostEvent extends Component {
    constructor(props){
        super(props);         
        this.state = {         
            eventData : [],
            eventname : null,
            eventdescription: null,
            eventdate : null,
            starttime : null,
            duration : null,
            venue : null,
            city : null,
            state : null,
            zip : null,
            country : null
        };
    };
        //get the profile data from backend  
        componentDidMount(){
            axios.defaults.withCredentials = true;
            axios.get('http://localhost:3001/getprofile/')
                    .then((response,err) => {
                         console.log("Profile Data: " + JSON.stringify(response.data));
                    this.setState({
                        eventData : this.state.eventData.concat(response.data)
                    });

                    this.state.eventData.map(event => { 
                        this.setState(
                            {
                                eventname : event.eventname,
                                eventdescription : event.eventdescription,
                                eventdate : event.eventdate,
                                starttime : event.starttime,
                                duration : event.duration,
                                venue : event.venue,
                                city : event.city,
                                state : event.state,
                                zip : event.zip,
                                country : event.country
                            }
                        );
                        
                    });
                                        
                    

                });

                
        }

    handleEventName = (e) => {
        this.setState({
            eventname : e.target.value
        })
    }

    handleEventDescription = (e) => {
        this.setState({
            eventdescription : e.target.value
        })
    }

    handleEventDate = (e) => {
        this.setState({
            eventdate : e.target.value
        })
    }

    handleStartTime = (e) => {
        this.setState({
            starttime : e.target.value
        })
    }

    handleDuration = (e) => {
        this.setState({
            duration : e.target.value
        })
    }

    handleVenue = (e) => {
        this.setState({
            venue : e.target.value
        })
    }
    handleCity = (e) => {
        this.setState({
            city : e.target.value
        })
    }
    handleState = (e) => {
        this.setState({
            state : e.target.value
        })
    }
    handleZip = (e) => {
        this.setState({
            zip : e.target.value
        })
    }
    handleCountry = (e) => {
        this.setState({
            country : e.target.value
        })
    }


    onChange = (e) => {
        console.log("Inside profile on change" + e.target.files[0])
        if(e.target.name == 'selectedFile'){
          this.setState({
            selectedFile: e.target.files[0]
          })

        }else{
          this.setState({ [e.target.name]: e.target.value });
        }

        let formData = new FormData();
 
        formData.append('selectedFile', e.target.files[0]);
      /*   formData.append('emailid',this.state.emailid); */
        
        
    }
  

    handleCreateEvent= (e) => {

        var values = {
            eventname :  this.state.eventname,
            eventdescription : this.state.eventdescription,
            eventdate : this.state.eventdate,
            starttime : this.state.starttime,
            duration : this.state.duration,
            venue : this.state.venue,
            city : this.state.city,
            state : this.state.state,
            zip : this.state.zip,
            country : this.state.country
        }
        
        this.props.updateEvent(values);
        
    
        
    }


    render()
    {   
        let redirectVar = null;
        // if(this.state.usertype === "traveler"){
        //   redirectVar = <Link to="/travelerinboxlistings">Inbox</Link>
        // } 
        // else if (this.state.usertype === "owner")
        // {
        //   redirectVar = <Link to="/ownerinboxlistings">Inbox</Link>
        // }
        const { description, selectedFile } = this.state;
           
        let EventDetails = this.state.eventData.map(event => {
            return(
                <form>
                <div className = "profile-form-inner">
                    <h3>Host New Event</h3>
                 
                <div>
                    <input type="text" onChange = {this.handleEventName} class="form-control input-lg js-input-field" id="hostEventName" placeholder="Event Name" value={this.state.eventname}></input>
                </div>
                <div>
                    <textarea onChange = {this.handleEventDescription} class="form-control input-lg js-input-field" id="hostEventDescription" placeholder = "Event Description" value={this.state.eventdescription} rows="4" required=""></textarea>
                </div>

                <div>
                    <input type="date" onChange = {this.handleEventDate} class="form-control input-lg js-input-field" id="hostEventDate" placeholder="Event Date" value={this.state.eventdate}></input>
                </div>

                <div>
                    <input type="time" onChange = {this.handleStartTime} class="form-control input-lg js-input-field" id="hostStartTime" placeholder="Event Start time" value={this.state.starttime}></input>
                </div>

                <div>
                    <input type="text" onChange = {this.handleEventDescription} class="form-control input-lg js-input-field" id="hostEventDuration" placeholder="Event Duration" value={this.state.duration}></input>
                </div>
                <div className = "profile-form-inner"></div>
                    <h3>Venue Details</h3>

                <div>
                    <input type="text" onChange = {this.handleVenue} class="form-control input-lg js-input-field" id="eventVenue" placeholder="Venue Details" value={this.state.venue}></input>
                </div>
                <div>
                    <input type="text" onChange = {this.handleCity} class="form-control input-lg js-input-field" id="eventCity" placeholder="City" value={this.state.city}></input>
                </div>
                <div>
                    <input type="text" onChange = {this.handleState} class="form-control input-lg js-input-field" id="eventState" placeholder="State" value={this.state.state}></input>
                </div>
                <div>
                    <input type="number" onChange = {this.handleZip} class="form-control input-lg js-input-field" id="eventZip" placeholder="Zip code" value={this.state.zip}></input>
                </div>

                <div>
                    <input type="text" onChange = {this.handleCountry} class="form-control input-lg js-input-field" id="eventCountry" placeholder="Country" value={this.state.country}></input>
                </div>
                
                

                
              
            </div>

            <div>
            <button onClick = {this.handleCreateName} class="btn btn-primary btn-md searchbox-submit save-btn" type="button" tabindex="5">
            Create Event
            </button>
            </div>

            </form>
            )
        })
        //if not logged in go to login page
/*         let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/travelerlogin"/>
        } */

        return(

            
            <div>
            <NavBarBlue></NavBarBlue>

            
            
            <div class="text-center">
                    
                    <div>
                    <label  for="uploadPhotoInput" name="description" value={description}
                    onChange={this.onChange} multiple >
                    </label>
                    <input type="file" id="uploadPhotoInput" name="selectedFile" onChange={this.onChange} multiple/>
                    </div>
                    <h2 class="user-name">{this.state.firstname}</h2>
                    
            </div>

            <div className = "profile-form-main">
              {EventDetails}
            </div>
            
            </div>
        )
    }

}

const mapStateToProps = state =>{
    console.log("mstp" + state.profilereducer.profileUpdated);
    return {
        profileUpdated : state.profilereducer.profileUpdated
    }
}

export default connect(mapStateToProps, {updateEvent})(HostEvent);