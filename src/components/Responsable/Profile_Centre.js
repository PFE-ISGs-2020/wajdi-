import React, { Component } from "react";
import PropTypes from "prop-types";
import {Button} from 'reactstrap';
import { connect } from "react-redux";
import SideBar from "./sidebar";
import axios from 'axios';
import DefaultImg from '../../assets/default-img.jpg';
 
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
  let image = DefaultImg;
  if (this.state.Centre.image){
      image = "http://localhost:5000/"+this.state.Centre.image
  }
return (
    <div>
        <SideBar pageWrapId={"page-wrap"} />
          <div id="page-wrap">
            <div className=" container ">             
              <div className="row ">
                <div className="col-12 col-md-4 ">
                  <br/>
                  <img src={image} alt="photo_de_profile" width="260px" height="290px"/>                     
                  <br/>       
                </div> 

                <div className="col-12  col-md-6">  
                  <br/>                              
                  <h2>  {this.state.Centre.NomCentre} </h2>                             
                  <br/>
                    <p><b> <span className="fa fa-map"></span>  Region:</b>   {this.state.Centre.RegionCentre}</p>
                    <p><b> <span className="fa fa-map-marker"></span> Adresse:</b>   {this.state.Centre.AdresseCentre}</p>
                    <p><b> <span className="fa fa-phone"></span> Tel:</b>   {this.state.Centre.TelCentre}</p>
                    <p><b> <span className="fa fa-envelope"></span> Email:</b>   {this.state.Centre.EmailCentre}</p>
                    <p><b> <span className="fa  fa-info"></span> Description:</b>   {this.state.Centre.DescriptionCentre}</p>
                 
                    <a href={"/ModiferCentre/"+this.state.Centre._id}>
                      <Button className="btn btn-warning" >
                        <b><span className="fa fa-edit"/> Modifier  </b>
                      </Button>
                    </a>
                           
                </div>
                         
              </div>

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

