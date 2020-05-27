import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab} from 'react-bootstrap';
import { connect } from "react-redux";
import axios from 'axios';
import HeaderClient from '../Header_Client';
import moment from 'moment';

const Details = props => (  
  <tr>
    <td>{props.Details_Inscription.Id_Formation.LibelleFormation}</td>
    <td>{moment(props.Details_Inscription.Id_Formation.DateDebutFormation).format('DD/MM/YYYY')}</td>
    <td>{moment(props.Details_Inscription.Id_Formation.DateFinFormation).format('DD/MM/YYYY')} </td>
    <td>{props.Details_Inscription.Id_Formation.NomTheme}</td>
  </tr>)

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
      axios.get('http://localhost:5000/Details_Inscription/Achats/'+client.id)
    .then(Details => {
      this.setState({ Details_Inscription: Details.data})
    })

   // const detailinscrit_FormationID = [...new Set(this.state.Details_Inscription.map(detailinscrit => detailinscrit.Id_Formation  ))]; 

  }

  MesAchats() {
    return this.state.Details_Inscription.map(currentDétails => {
    return <Details   Details_Inscription={currentDétails} 
    
    key={currentDétails._id} />;

    });
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
                  <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Libelle Formation </th>
                  <th>Date Debut Formation </th>
                  <th>Date Fin Formation </th>
                  <th>Theme </th>
                </tr>
              </thead>
              <tbody>
                { this.MesAchats() }
              </tbody>
            </table>
            
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
