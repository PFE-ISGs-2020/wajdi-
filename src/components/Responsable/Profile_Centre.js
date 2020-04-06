import React, { Component } from "react";
import PropTypes from "prop-types";
import {Image } from 'react-bootstrap';
import { connect } from "react-redux";
import SideBar from "./sidebar";
import axios from 'axios';

 
class ProfileCentre extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
            Centre: []
         };
    }

    componentDidMount(){
        const {centre} = this.props.auth;
      axios.get('http://localhost:5000/Centre/'+centre.id)
    .then(centr => {
      this.setState({ Centre: centr.data })
    })
    .catch((error) => {
      console.log(error);
    })
  }

render() { 
    
return (
    <div>
        <SideBar pageWrapId={"page-wrap"} />
        
            <div className=" container "> 
                 <div className="card ">
                     <div className="row" >
                         <div className="col-sm-3">
                            <Image src="//placehold.it/200" alt=""/>
                         </div>
                         <div>
                             
                             <h2>  {this.state.Centre.NomCentre} </h2>
                             <br/>
                            <p><b> <span className="fa fa-map"></span>  Region:</b>   {this.state.Centre.RegionCentre}</p>
                            <p><b> <span className="fa fa-map-marker"></span> Adresse:</b>   {this.state.Centre.AdresseCentre}</p>
                            <p><b> <span className="fa fa-phone"></span> Tel:</b>   {this.state.Centre.TelCentre}</p>
                            <p><b> <span className="fa fa-envelope"></span> Email:</b>   {this.state.Centre.EmailCentre}</p>
                            
                         </div>
                     </div>
                     <div className= "row">
                     <p className="col-sm-9 offset-3"><b> <span className="fa  fa-info"></span> Description:</b>   {this.state.Centre.DescriptionCentre}</p>
                     </div>
                 {/*   <div className="card-header border-0">
                        <img src="//placehold.it/200" alt=""/>
                    </div>
                    <div className="card-block px-2">
                        <div className="card-text">
                        
                            <p><b> <span className="fa fa-map"></span>  Region:</b>   {this.state.Centre.RegionCentre}</p>
                            <p><b> <span className="fa fa-map-marker"></span> Adresse:</b>   {this.state.Centre.AdresseCentre}</p>
                            <p><b> <span className="fa fa-phone"></span> Tel:</b>   {this.state.Centre.TelCentre}</p>
                            <p><b> <span className="fa fa-envelope"></span> Email:</b>   {this.state.Centre.EmailCentre}</p>
                            <p><b> <span className="fa  fa-info"></span> Description:</b>   {this.state.Centre.DescriptionCentre}</p>
               
                        </div>
            
                    </div>
                    
                    {/* <div class="card-footer w-100 text-muted">
                    FOOTER
                    </div> */}
                </div>                          
            </div>
        </div>  
     
    );
  }
} 
ProfileCentre.propTypes = {
   // logoutCentre: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
export default connect(mapStateToProps)(ProfileCentre);

