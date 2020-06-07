import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Button,  Modal,  ModalBody, ModalHeader} from 'reactstrap';
import axios from 'axios';
import CardFormation from '../CardFormation';
import HeaderClient from '../Header_Client';
import moment from 'moment';


const Details = props => (  
  <tr>
    <td>{props.Details_Inscription.Id_Formation.LibelleFormation}</td>
    <td>{moment(props.Details_Inscription.Id_Formation.DateDebutFormation).format('DD/MM/YYYY')}</td>
    <td>{moment(props.Details_Inscription.Id_Formation.DateFinFormation).format('DD/MM/YYYY')}</td>
    <td>{props.Details_Inscription.Id_Formation.NomTheme}</td>
    <td>
    <Button className="btn btn-secondary btn-sm" onClick={ () => { props.toggleModalFormation(props.Details_Inscription.Id_Formation._id, props.Details_Inscription.Id_Formation.LibelleFormation, props.Details_Inscription.Id_Formation.NomCentre)}}>
      <span className="fa fa-info "></span>
    </Button>
    </td> 

    <td>
         
        <Button className="btn btn-danger btn-sm"
           onClick={() => { if (window.confirm('Voulez-vous vraiment supprimer cette demande?'))
           props.supprimerDemande(props.Details_Inscription._id) } }   >
            <span className="fa fa-times"></span>
        </Button>

    </td> 

  </tr>)

class MesDemandes extends Component {
    constructor(props) {
        super(props);

        this.toggleModalFormation = this.toggleModalFormation.bind(this)
        this.supprimerDemande  = this.supprimerDemande.bind(this)

        this.state = {
          MesDemandes: [],
          //For Modal Formation
          Formation :  null,
          NomCentre: null,
          isModalFormationOpen: false, 
          Id_Formation: null,
         };
    }

    componentDidMount(){
      const {client} = this.props.authClient;
      axios.get('http://localhost:5000/Details_Inscription/MesDemandes/'+client.id)
    .then(Details => {
      this.setState({ MesDemandes: Details.data})
    })
    }

  supprimerDemande(id) {    
    axios.delete('http://localhost:5000/Details_Inscription/'+id)
      .then(det => { console.log(det.data)});
      this.setState({
        MesDemandes: this.state.MesDemandes.filter(el => el._id !== id)
    })
  }

  MesDemandes() {
    return this.state.MesDemandes.map(currentDétails => {
    return <Details   Details_Inscription={currentDétails} 
    toggleModalFormation={this.toggleModalFormation}
    supprimerDemande={this.supprimerDemande}
    key={currentDétails._id} />;

    });
  }

  toggleModalFormation(id, Formation, NomCentre) {
    this.setState({
      isModalFormationOpen: !this.state.isModalFormationOpen,
     Id_Formation: id,
     Formation: Formation,
     NomCentre: NomCentre
     
    });  
  }

render() { 
  
    if(!this.state.MesDemandes[0]){
        return(
            <div>
                <HeaderClient /> 
                <br/>
                 <div className="container">
                 
                     <div className="col-12">
                       <br/>
                       <h3>Demandes d'inscription</h3>
                       <hr/>
                       <br/>
                       <h5>Vous n'avez aucune demandes d'inscription qui n'est pas encore traitée.</h5>
                    </div>
                </div>
            </div>     
        )
    }
  

  return (
      <div>
       <HeaderClient /> 
        <br/>
            <div className="container">
            
                <div className="col-12">
                  <br/>
                  <h3>Demandes d'inscription</h3>
                  <br/>
                  <p>Vous trouvez ci-dessous les demandes d'inscription qui ne sont pas encore traitées.</p>
                  <table className="table">
              <thead className="thead-light">
                <tr>

                  <th>Libéllé </th>
                  <th>Date Debut </th>
                  <th>Date Fin </th>
                  <th>Thème </th>
                  <th>Voir Plus </th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                { this.MesDemandes() }
              </tbody>
            </table>
            
                </div>
                
                
                  {/*modal formation begin */}
            <Modal isOpen={this.state.isModalFormationOpen} toggle={this.toggleModalFormation}>   
              <ModalHeader>
                {this.state.Formation}
              </ModalHeader>
              <ModalBody> 
              <CardFormation  Id_Formation={this.state.Id_Formation} />
                <p> <b>Centre:</b> { this.state.NomCentre }</p>
              </ModalBody>
            </Modal>
            {/*modal formation end */}  
            </div>         
             
        </div>              
   );
  }
}             
MesDemandes.propTypes = {
      authClient: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    authClient: state.authClient
  });

export default connect(mapStateToProps)(MesDemandes);                                        
