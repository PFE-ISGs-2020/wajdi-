import React, { Component } from "react";
import { logoutClient } from "../../actions/authActionsClient";
import PropTypes from "prop-types";
import {Image } from 'react-bootstrap';
import {Button} from 'reactstrap';
import { connect } from "react-redux";
import axios from 'axios';

import moment from 'moment'

 
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
      this.setState({ Client: clt.data })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutClient();
  };

render() { 
  
    return (
        
        
        <div className=" container ">     
            
            <div className="card ">
                <div className="row" >
                       
                    <div className="col-sm-3">
                        <Image src={"http://localhost:5000"+this.state.Client.image} alt=""/>
                    </div>
                    <div className=" order-sm-last">
                        <a href={"/ModifierProfile/"+this.state.Client._id}>
                            <Button className="btn btn-warning btn-sm" >
                                <span className="fa fa-edit"></span>
                            </Button>
                        </a>
                    </div> 
                    <div>
                         
                        <h2>  {this.state.Client.NomClient +" "+this.state.Client.PrenomClient} </h2>
                        <br/> 
                      {/*   <div className="row ">
                    <p><b>Nom: </b>   {this.state.Client.NomClient}</p>
                </div>
                <div className="row ">
                    <p><b>Prénom: </b> {this.state.Client.PrenomClient}</p>
                </div>  */}
                <div className="row ">
                    <p><span className="fa fa-calendar"></span><b>  Date de naissance: </b>   {moment(this.state.Client.DatenaissClient).format('DD/MM/YYYY')}</p>
                </div> 
                <div className="row"> 
                    <p><span className="fa fa-briefcase"></span><b>  Profession: </b>  {this.state.Client.ProfessionClient}</p>
                </div>  
                <div className="row "> 
                    <p><span className="fa fa-graduation-cap"></span><b>  Niveau d'études: </b> {this.state.Client.NiveauClient}</p>
                </div> 
                <div className="row ">
                    <p><span className="fa fa-map-marker"></span><b>  Adresse: </b>{this.state.Client.AdresseClient}</p>
                </div>
                <div className="row ">
                    <p><span className="fa fa-envelope"></span><b>  Email: </b>{this.state.Client.emailClient}</p>
                </div> 
                <div className="row ">
                    <p> <span className="fa fa-phone"></span><b>  Tel: </b>{this.state.Client.TelClient}</p>
                </div>     
                    </div>

                </div>        
                            
            </div>         
                     
        <a href="/" className="menu-item" onClick={this.onLogoutClick}>
            <Button>   <span className="fa fa-sign-out fa-lg"/>  Logout</Button>
        </a> 
    </div>     
                
   );
  }
}             
ProfileClient.propTypes = {
    logoutClient: PropTypes.func.isRequired,
    authauthClient: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    authClient: state.authClient
  });
export default connect(mapStateToProps,{ logoutClient })(ProfileClient);                                        
