import React, { Component } from 'react';
import axios from 'axios';
import SideNavWebmaster from './sideNavWebmaster'
import {Button,  Modal,  ModalBody, ModalHeader} from 'reactstrap';

const Demande = props => (  
  <tr>
    <td>{props.centre.NomCentre}</td>
    <td>{props.centre.RegionCentre}</td>
    <td>{props.centre.TelCentre}</td>
    <td>{props.centre.EmailCentre}</td>    
    <td>
    <Button className="btn btn-secondary btn-sm" onClick={ () => { props.toggleModalCentre( props.centre)}}>
      <span className="fa fa-info "></span>
    </Button>
    </td>   
    <td>
      <a href="/DemandeList" onClick={() => { props.approveDemande(props.centre) }}>
        <Button className="btn btn-success btn-sm" >
        <span className="fa fa-user-plus" /> 
        </Button>
      </a> 
    </td>
    <td> 
      <a href="/DemandeList"> 
      <Button className="btn btn-danger btn-sm" 
       onClick={() => { if (window.confirm('Voulez-vous vraiment rejeter cette demande?'))
         props.deleteDemande(props.centre._id) }}  >
        <span className="fa fa-user-times" /> 
      </Button>  
      </a>
    </td>
  </tr>
)

export default class DemandeList extends Component {
  constructor(props) {
    super(props);
 
    this.deleteDemande = this.deleteDemande.bind(this)
    this.approveDemande = this.approveDemande.bind(this)
    this.toggleModalCentre = this.toggleModalCentre.bind(this)

    this.state = {centre: [],
                  Centre :  [],
                  isModalCentreOpen: false};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/Centre/Acces')
      .then(centr => {
        this.setState({ centre: centr.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteDemande(id) {
    
    axios.delete('http://localhost:5000/Centre/'+id)
      .then(demand => { console.log(demand.data)});

    this.setState({
      centre: this.state.centre.filter(el => el._id !== id && el.Acces === 0)
    })
  }

  approveDemande(Centre) {

    const CentreUpdated = {
      NomCentre: Centre.NomCentre,
      AdresseCentre : Centre.AdresseCentre,
      DescriptionCentre: Centre.DescriptionCentre,
       RegionCentre: Centre.RegionCentre,
       TelCentre: Centre.TelCentre,
       EmailCentre: Centre.EmailCentre,
       passwordCentre: Centre.passwordCentre,
       Acces: "1"}
       
    axios.post('http://localhost:5000/Centre/update/'+ Centre._id , CentreUpdated )
      .then(demand => { console.log(demand.data)});
      
     this.setState({
      centre : this.state.centre.filter(el => el._id !== Centre._id  && el.Acces === 0)
    })
  }

  toggleModalCentre(Centre) {
    this.setState({
      isModalCentreOpen: !this.state.isModalCentreOpen,
      Centre: Centre
     
    });  
  }

  DemandeList() {
    return this.state.centre.map(currentdemande => {
      return <Demande  centre={currentdemande} deleteDemande={this.deleteDemande}  
      approveDemande={this.approveDemande} key={currentdemande._id} 
      toggleModalCentre={this.toggleModalCentre}/>;

    });
  }

  render() {
    if (!this.state.centre[0]){
      return(
        <div>
      <SideNavWebmaster pageWrapId={"page-wrap"} />
      <div id="page-wrap">
        <div className=" container ">
        <div className="row justify-content-md-center">  
        <section className="col-10 ">   
        
            <div className="col-12">
              <br/>
              <br/>
              <h3> Demandes d'activation des comptes responsable</h3>
              <hr/>
              <br/>
              <p >
                Il n'y a aucune demande d'activation pour le moment!
              </p>
              <br/>
              <br/> 
            </div>   
        </section>
      </div>
      </div>
      </div>
      </div>
      )
    }
    else{
    return (
      <div>
        <SideNavWebmaster pageWrapId={"page-wrap"}/>
        <div id="page-wrap" className="container">
          <div className="container">
          <div className="row justify-content-md-center"> 
              <section className="col-10 text-center">   
              <br/>
              <br/>
              <h3> Demandes d'activation des comptes responsable</h3>
              <br/>
              <br/> 
            
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>Nom Centre</th>
                    <th>Région</th>
                    <th>Tel</th>
                    <th>Email</th>
                    <th>Voir Plus</th>
                    <th>Valider</th>
                    <th>Rejeter</th>
                  </tr>
                </thead>
                <tbody>
                  { this.DemandeList() }
                </tbody>
              </table>
              </section>
            </div>
            {/*modal centre begin */}
            <Modal isOpen={this.state.isModalCentreOpen} toggle={this.toggleModalCentre}>   
              <ModalHeader className="justify-content-center">
                <h3 >{this.state.Centre.NomCentre}</h3>
              </ModalHeader>
              <ModalBody> 
              <p> <b> <span className="fa fa-university"> </span> Nom: </b> {this.state.Centre.NomCentre}</p>
              <p> <b> <span className="fa fa-map"> </span> Région: </b> {this.state.Centre.RegionCentre}</p>
              <p> <b> <span className="fa fa-map-marker"> </span> Adresse: </b> {this.state.Centre.AdresseCentre}</p>
              <p> <b> <span className="fa fa-envelope"> </span> Email: </b> {this.state.Centre.EmailCentre}</p>
              <p> <b> <span className="fa fa-phone"> </span> Tel: </b> {this.state.Centre.TelCentre}</p>
              <p> <b> <span className="fa fa-align-justify"> </span> Déscription: </b> {this.state.Centre.DescriptionCentre}</p>
              </ModalBody>
            </Modal>
            {/*modal Centre end */} 
          </div>
        </div>     
      </div>
      
    )
  }}
}