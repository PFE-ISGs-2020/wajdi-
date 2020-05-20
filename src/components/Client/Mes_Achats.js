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
          Details_Inscription: [],
          Formation:[],
          FormationsInscrit:[],
          detailinscrit:[]
         };
    }

    componentDidMount(){
      const {client} = this.props.authClient;
      axios.get('http://localhost:5000/Details_Inscription/achat/'+client.id)
    .then(Details_Inscription => {
      this.setState({ Details_Inscription: Details_Inscription.data})
    })

    const detailinscrit_FormationID = [...new Set(this.state.Details_Inscription.map(detailinscrit => detailinscrit.Id_Formation  ))]; 

    
    axios.get('http://localhost:5000/Formation/' )
    .then(Formation => {
      this.setState({ Formation: Formation.data});
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
                  <br/>

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
