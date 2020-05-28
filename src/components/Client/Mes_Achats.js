import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab} from 'react-bootstrap';
import { connect } from "react-redux";
import {Button,  Modal,  ModalBody, ModalHeader} from 'reactstrap';
import axios from 'axios';
import CardFormation from '../CardFormation'
import HeaderClient from '../Header_Client';
import moment from 'moment';

const Details = props => (  
  <tr>
    <td>{props.Details_Inscription.Id_Formation.LibelleFormation}</td>
    <td>{moment(props.Details_Inscription.Id_Formation.DateDebutFormation).format('DD/MM/YYYY')}</td>
    <td>{moment(props.Details_Inscription.Id_Formation.DateFinFormation).format('DD/MM/YYYY')} </td>
    <td>{props.Details_Inscription.Id_Formation.NomTheme}</td>
    <td>
    <Button className="btn btn-secondary btn-sm" onClick={ () => { props.toggleModalFormation(props.Details_Inscription.Id_Formation._id, props.Details_Inscription.Id_Formation.LibelleFormation)}}>
      <span className="fa fa-info "></span>
    </Button>
    </td> 
  </tr>)

class MesAchats extends Component {
    constructor(props) {
        super(props);
        this.toggleModalFormation = this.toggleModalFormation.bind(this)

        this.state = {
          Cours: [],
          //For Modal Formation
          Formation :  null,
          isModalFormationOpen: false, 
          Id_Formation: null,
         };
    }

    componentDidMount(){
      const {client} = this.props.authClient;
      axios.get('http://localhost:5000/Details_Inscription/cours/'+client.id)
    .then(Details => {
      this.setState({ Cours: Details.data})
    })

  }

  FormationsEnCours() {
    var now = moment();
    return this.state.Cours.map(currentDetails => {
      if ( now.isBetween(currentDetails.Id_Formation.DateDebutFormation , currentDetails.Id_Formation.DateFinFormation) )  {
        return <Details   Details_Inscription={currentDetails} 
        toggleModalFormation={this.toggleModalFormation}
        key={currentDetails._id} />;
      }
      else {return null;} 
    });
  }

  FormationsAtteintes() {
    var now = moment();
    return this.state.Cours.map(currentDetails => {
      if (now.isAfter(currentDetails.Id_Formation.DateFinFormation) )  {
        return <Details   Details_Inscription={currentDetails} 
        toggleModalFormation={this.toggleModalFormation}
        key={currentDetails._id} />;
      }
      else {return null;} 
    });
  }

  Formations_A_venir(){
    var now = moment();
    return this.state.Cours.map(currentDetails => {
      if (now.isBefore(currentDetails.Id_Formation.DateDebutFormation) )  {
        return <Details   Details_Inscription={currentDetails} 
        toggleModalFormation={this.toggleModalFormation}
        key={currentDetails._id} />;
      }
      else {return null;} 
      });
  }

  toggleModalFormation(id, Formation) {
    this.setState({
      isModalFormationOpen: !this.state.isModalFormationOpen,
     Id_Formation: id,
     Formation: Formation
     
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

                  <th>Libéllé </th>
                  <th>Date Debut </th>
                  <th>Date Fin </th>
                  <th>Thème </th>
                  <th>Voir Plus </th>
                </tr>
              </thead>
              <tbody>
                { this.FormationsEnCours() }
              </tbody>
            </table>
            
                </div>
                
                </Tab>
                <Tab  title="Formations à venir" eventKey="Formations_A_Venir" >
                <div className="col-12">
                  <br/>
                  <h3>Formations à venir</h3>
                  <br/>
                  <table className="table">
              <thead className="thead-light">
                <tr>

                  <th>Libéllé </th>
                  <th>Date Debut </th>
                  <th>Date Fin </th>
                  <th>Thème </th>
                  <th>Voir Plus </th>
                </tr>
              </thead>
              <tbody>
                { this.Formations_A_venir() }
                
              </tbody>
            </table>
                </div>
                </Tab>
                <Tab  title="Formations atteintes" eventKey="FormationsAtteintes" >
                <div className="col-12">
                  <br/>
                  <h3>Formations atteintes</h3>
                  <br/>
                  <table className="table">
              <thead className="thead-light">
                <tr>

                  <th>Libéllé </th>
                  <th>Date Debut </th>
                  <th>Date Fin </th>
                  <th>Thème </th>
                  <th>Voir Plus </th>
                </tr>
              </thead>
              <tbody>
                { this.FormationsAtteintes() }
                
              </tbody>
            </table>
                </div>
                </Tab>
                </Tabs> 
                  {/*modal formation begin */}
            <Modal isOpen={this.state.isModalFormationOpen} toggle={this.toggleModalFormation}>   
              <ModalHeader>
                {this.state.Formation}
              </ModalHeader>
              <ModalBody> 
              <CardFormation  Id_Formation={this.state.Id_Formation} />
              </ModalBody>
            </Modal>
            {/*modal formation end */}  
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
