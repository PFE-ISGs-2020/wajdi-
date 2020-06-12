import React, { Component } from "react";
import PropTypes from "prop-types";
import {Button} from 'react-bootstrap';
import { connect } from "react-redux";
import axios from 'axios';
import DefaultImg from '../../assets/default-img.jpg'; 
import moment from 'moment'

import HeaderClient from '../Header_Client';

class ProfileClient extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
            Client: []
         };
    }

    componentDidMount(){
        const {client} = this.props.authClient;
      axios.get('http://localhost:5000/Client/'+client.id)
    .then(clt => {
      this.setState({ Client: clt.data})
    })
    .catch((error) => {
      console.log(error);
    })
  }


render() { 
  let image = DefaultImg;
  if (this.state.Client.imageClient){
      image = "http://localhost:5000/"+this.state.Client.imageClient
  }
    return (
      <div>
       <HeaderClient /> 

            <div className="container">
                <div className="row" >
              
                  <div className="col-12 col-md-4 ">                  
                   
                    <br/>
                    <img src={image} alt="photo_de_profile" width="280px" height="300px"/>               
                    
                  </div>

                  <div className="col-12  col-md-6">
                       <br/>   
                      <h2>  {this.state.Client.NomClient +" "+this.state.Client.PrenomClient} </h2>
                      <br/>
                      
                        <p><span className="fa fa-calendar"></span><b>  Date de naissance: </b>   {moment(this.state.Client.DatenaissClient).format('DD/MM/YYYY')}</p>
                      
                        <p><span className="fa fa-briefcase"></span><b>  Profession: </b>  {this.state.Client.ProfessionClient}</p>
                        
                        <p><span className="fa fa-graduation-cap"></span><b>  Niveau d'études: </b> {this.state.Client.NiveauClient}</p>
          
                        <p><span className="fa fa-map-marker"></span><b>  Adresse: </b>{this.state.Client.AdresseClient}</p>
                      
                        <p><span className="fa fa-envelope"></span><b>  Email: </b>{this.state.Client.emailClient}</p>
                      
                        <p> <span className="fa fa-phone"></span><b>  Tel: </b>{this.state.Client.TelClient}</p>
                        
                        <a href={"/ModifierProfile/"+this.state.Client._id}>
                        <Button className="btn btn-warning"  >
                        <b><span className="fa fa-edit"/> Modifier  </b>
                        </Button>
                        </a>

                    </div>                    
                      
                </div>              
            </div>         
             
        </div>              
   );
  }
}             
ProfileClient.propTypes = {
      authClient: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    authClient: state.authClient
  });

export default connect(mapStateToProps)(ProfileClient);                                        
