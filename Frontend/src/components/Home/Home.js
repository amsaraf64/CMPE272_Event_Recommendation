import React,{Component} from 'react';
import homeawaylogo from '../../images/logo-homeaway-white.svg';
import birhouselogo from '../../images/birdhouse-bceheader-white.svg';
import cookie from 'react-cookies';
import axios from 'axios';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { searchProperties } from "../../actions";
import {Redirect} from 'react-router';
import jwtdecode from 'jwt-decode';
import swal from 'sweetalert'

//create the Landing Component
class Home extends Component {
    constructor(props){
        super(props);  
        this.state = {         
            searchData : [],
            destination : null,
            start_date : null,
            end_date : null,
            accomodates : null,
            isOwner : false
        };
    }

    
    componentWillMount(){
            if(localStorage.getItem("usertoken")){
                var tokenvalue = jwtdecode(localStorage.getItem("usertoken"));
                this.setState({
                    token: true,
                    username: tokenvalue.user.firstname,
                    usertype : tokenvalue.user.usertype
                })
            }
    }
    
    searchResultsHandler = async (e) => {
        var searchData = []
        var values = {
            destination : this.state.destination,
            start_date : this.state.start_date,
            end_date : this.state.end_date,
            accomodates : this.state.accomodates
        }
        console.log("Inside search results")

//        localStorage.setItem('searchdata', JSON.stringify(data));

/*         axios.post('http://localhost:3001/searchproperties',data)
            .then(response => {
                if(response.status == 200){
                    console.log("res" + response.data)
                     this.setState({
                        searched : true,
                        searchData : this.state.searchData.concat(response.data)
                    }) 
                     searchData  = response.data
                     localStorage.setItem('searchdata', JSON.stringify(searchData));
                }else{
                    this.setState({
                        searched : false
                    })
                }
            }) 
            */
           await this.props.searchProperties(values);
            console.log(this.props.searchresults)

           
           
    }
   
    handleLogout = () => {
        localStorage.removeItem('usertoken')
     }

    handleDestination = (e) => {
        this.setState({
            destination : e.target.value
        })
    }

    handleStartDate = (e) => {
        this.setState({
            start_date : e.target.value
        })
    }

    handleEndDate = (e) => {
        this.setState({
            end_date : e.target.value
        })
    }

    handleAccomodates = (e) => {
        this.setState({
            accomodates : e.target.value
        })
    }

    handlerListProperties = (e) => {

       // var emailid = document.cookie.substring(7);

        /* axios.get('http://localhost:3001/getusertype/'+ emailid)
            .then(response => {
                console.log(response.data[0].usertype);
                if(response.status === 200 && response.data[0].usertype == "owner"){
                    this.setState({
                        isOwner : true
                    })
                }else{
                    this.setState({
                        isOwner : false
                    })
                }
            }) */
            if(this.state.usertype == "owner")
            {
                this.setState({
                    redirectVarOwner :  <Redirect to = "/sidebar"/>
                })
               
            }
            else if (this.state.usertype == "traveler"){
                swal("Please login as an owner","","warning")
                this.setState({
                    redirectVarOwner : <Redirect to = "/ownerlogin"/>
                })             
            }
    }
    

    render(){
        let redirectVar = null;
        let redirectVarOwner = null;
        if(this.props.searchFlag===true){
            redirectVar = <Redirect to= "/searchresults"/>
        }
/*         if(this.state.usertype === "traveler"){
            redirectVarOwner = <Redirect to = "/ownerlogin"/>
        } 
        else if (this.state.usertype === "owner")
        {
            redirectVarOwner = <Link to="/sidebar" className="site-header-list-your-property btn btn-default btn-inverse" data-bypass="true" >List your property</Link>
        } */
        return(       
        <div>
        {redirectVar}
        <div className="bg">

        <nav className="navbar navigation-bar">
        <div className="container-fluid">
            <div className="navbar-header">
            <Link to = "/home"><img src = {homeawaylogo} height="50" width="200"></img></Link>
            </div>
            <div className = "navbar nav navbar-right">
            <ul className="nav navbar-nav" >
            <li className="active"><Link to="#"><font color="white">TripBoards</font></Link></li>
            

            <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="#"><font color="white">{this.state.username}</font>
                <span className="caret"></span></a>
                <ul className="dropdown-menu">
                <li><Link to="/profile">My profile</Link></li>
                {/* <li><Link to="/landing" onClick = {this.handleLogout}>Logout</Link></li> */}
                <li><a href="/landing" onClick = {this.handleLogout}>Logout</a></li>
                </ul>
            </li>
        
            <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#"><font color="white">Help</font>
            <span className="caret"></span></a>
            <ul className="dropdown-menu">
            <li><Link to="/help">Visit help center</Link></li>
            </ul>
            </li>
            <li>
            <button className="site-header-list-your-property btn btn-default btn-inverse" data-bypass="true" onClick = {this.handlerListProperties} >List your property</button>
            {this.state.redirectVarOwner} 
            {/* <button className="site-header-list-your-property btn btn-default btn-inverse" data-bypass="true" onClick = {this.handlerListProperties}>List your property</button> */}
            </li>
            <li>
            <Link to = "/home"><img src = {birhouselogo} height="45" width="45"></img></Link>
            </li>
            </ul>
            </div>
        </div>
        </nav>
       
        <div className="jumbotron">
        
        <div className = "home-inputs">

        <div className="container">
            <h2 className="display-3"><font color="white">Book beach houses, cabins,<br></br> condos and more, worldwide</font></h2>
        </div>

        <br></br><br></br>
        <form>
        <input type = "text" onChange = {this.handleDestination} className = "where" placeholder = "Destination"></input>
        &nbsp;&nbsp;
        <input type="date" onChange = {this.handleStartDate} className="form-landing"/>
        &nbsp;&nbsp;
    
        <input type="date" onChange = {this.handleEndDate} className="form-landing" />
        &nbsp;&nbsp;
        
        <input type = "text" onChange = {this.handleAccomodates} className = "form-landing" placeholder = "Guests"></input>
        &nbsp;&nbsp;
        <button onClick={this.searchResultsHandler} className="btn btn-primary btn-md searchbox-submit" type="button" tabIndex="5">
        Search
        </button>
        </form>

        </div>
        </div>


        <div className="page-footer font-small pt-4 footer-flex">

        {/*     <div className="container-fluid text-center text-md-left"> */}

            {/* <div className="row"> */}

                <div className="left-class">
                <h4><font color="white"><b>Your whole vacation starts here</b></font></h4>
                <p><font color="white">Choose a rental from the world's best selection</font></p>
                </div>

                <div className="middle-class">
                    <h4 ><font color="white"><b>Book and stay with confidence</b></font></h4>
                    <p><font color="white">Secure payments, peace of mind</font></p>
                </div>

                <div className="right-class">
                    <h4 ><font color="white"><b>Your vacation your way</b></font></h4>
                    <p><font color="white">More space, more privacy, no compromises</font></p>       
                </div>

         {/*    </div> */}
            
       {/*      </div> */}


        </div>

        </div>
        </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        searchFlag : state.searchpropertiesreducer.searchFlag,
        searchresults : state.searchpropertiesreducer.searchresults
    }
}

export default connect(mapStateToProps, {searchProperties})(Home);
