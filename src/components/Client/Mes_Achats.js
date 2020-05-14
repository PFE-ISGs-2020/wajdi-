import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab} from 'react-bootstrap';
import { connect } from "react-redux";
import axios from 'axios';
import HeaderClient from '../Header_Client';

class MesAchats extends Component {
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
 
    return (
      <div>
       <HeaderClient /> 
        <br/>
            <div className="container">
            <Tabs id="controlled-tab" >
                <Tab  title="Formations en cours" eventKey="FormationsEnCours" > 
                <div className="col-12">
                <br/>
                    <h3>Formations en cours</h3>
                    <br/>
                </div>
                
                </Tab>
                <Tab  title="Formations atteintes" eventKey="FormationsAtteintes" >
                <div className="col-12">
                <br/>
                <h3>Formations atteintes</h3>
                </div>
              
                </Tab>
                </Tabs>   
            </div>         
             
        </div>              
   );
  }
}             
MesAchats.propTypes = {
      authClient: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    authClient: state.authClient
  });

export default connect(mapStateToProps)(MesAchats);                                        
