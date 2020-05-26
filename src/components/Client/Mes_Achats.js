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
    <td>{moment(props.Details_Inscription.Id_Formation.DateFinFormation).format('DD/MM/YYYY')}</td>
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
          Details_Inscription_EnCours: [],
          Details_Inscription_Atteintes: [],
          //For Modal Formation
          Formation :  null,
          isModalFormationOpen: false, 
          Id_Formation: null,
         };
    }

    componentDidMount(){
      const {client} = this.props.authClient;
      axios.get('http://localhost:5000/Details_Inscription/FormationsEnCours/'+client.id)
    .then(Details => {
      this.setState({ Details_Inscription_EnCours: Details.data})
    })

    axios.get('http://localhost:5000/Details_Inscription/FormationsAtteintes/'+client.id)
    .then(Details => {
      this.setState({ Details_Inscription_Atteintes: Details.data})
    })
  }

  FormationsEnCours() {
    return this.state.Details_Inscription_EnCours.map(currentDétails => {
    return <Details   Details_Inscription={currentDétails} 
    toggleModalFormation={this.toggleModalFormation}
    key={currentDétails._id} />;

    });
  }

  FormationsAtteintes() {
    return this.state.Details_Inscription_Atteintes.map(currentDétails => {
    return <Details   Details_Inscription={currentDétails} 
    toggleModalFormation={this.toggleModalFormation}
    key={currentDétails._id} />;

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
              </tbody>
            </table>
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
