import React, { Component } from 'react';
import {Button, Modal,  ModalBody} from 'reactstrap';
import axios from 'axios';
import DetailsClient from '../Details_Client'

const Details = props => (  
  <tr>
    
    <td>{props.details.NomClient}</td>
    <td>{props.details.PrenomClient}</td>
    <td>{props.details.createdAt}</td>

    <td>
       <a href="/InscriptionList">
             <Button className="btn btn-success btn-sm"   
              onClick={() => { props.accepterDetails(props.details) }}>  
              <span className="fa fa-check"></span>
            </Button>      
        </a>          
    </td>                 
    <td>
      <a href="/InscriptionList">
          <Button className="btn btn-danger btn-sm"
            onClick={() => { props.supprimerDetails(props.details._id) }}>
            <span className="fa fa-times"></span>
          </Button>
      </a>
    </td> 
   <td>
    
      <Button className="btn  btn-sm" onClick={ () => { props.toggleModalClient(props.details.Id_Client)}}>
                          
        <span className="fa fa-plus "></span>
       
    </Button>
   
    </td>                       
  </tr>
)

export default class InscriptionList extends Component {
  constructor(props) {
    super(props);

    this.supprimerDetails = this.supprimerDetails.bind(this)
    this.accepterDetails = this.accepterDetails.bind(this)
    this.toggleModalClient = this.toggleModalClient.bind(this)
    
    this.state = {  details: [],
                    Details : null,
                    Formation: null,
                    isModalClientOpen: false,
                    Id_Client: null,
                    
                   };
  }
  

  componentDidMount() {
    
    axios.get('http://localhost:5000/Details_Inscription/Demande')
      .then(det => {
        this.setState({ details: det.data, })
        
      })
      .catch((error) => {
        console.log(error);
      })
     
  }
  toggleModalClient(id) {
    this.setState({
      isModalClientOpen: !this.state.isModalClientOpen,
     Id_Client: id,
     
    });  
  }
 
  supprimerDetails(id) {    
    axios.delete('http://localhost:5000/Details_Inscription/'+id)
      .then(det => { console.log(det.data)});

    this.setState({
        details: this.state.details.filter(el => el._id !== id)
    })
  }

  accepterDetails(Details) {

    const DetailsUpdated = {

        Id_Client: Details.Id_Client,  
        NomClient : Details.NomClient,
        EtatInscription : 1,
        PrenomClient : Details.PrenomClient,
        Id_Formation : Details.Id_Formation,
       }
        
     axios.post('http://localhost:5000/Details_Inscription/update/'+ Details._id , DetailsUpdated )
       .then(det => { console.log(det.data)});
       
      this.setState({
       details : this.state.details.filter(el => el._id !== Details._id  && el.EtatInscription === 0)
     })
   }
 
  DetailsList() {
    return this.state.details.map(currentdetails => {
    return <Details   details={currentdetails} supprimerDetails={this.supprimerDetails} 
    key={currentdetails._id} accepterDetails={this.accepterDetails} 
     toggleModalClient={this.toggleModalClient}
    />;

    });
  }

  render() {
    return (
      <div className=" container ">
       <div className="row justify-content-md-center">  
        <section className="col-10 text-center">   
        <br/>
        <br/>
        <h3> Liste des demandes d'inscription  </h3>
        <br/>
        <br/>        
        <table className="table">
          <thead className="thead-light">
            <tr>
              
              <th>Nom Client</th>
              <th>Prenom Client</th>
              <th>Date Inscription</th>
              <th>Accepter</th>
              <th>Supprimer</th>
              <th>Plus de détails</th>
            </tr>
          </thead>
          <tbody>
            { this.DetailsList() }
          </tbody>
        </table>
        </section>
      </div>
       {/*modal client begin */}
       <Modal isOpen={this.state.isModalClientOpen} toggle={this.toggleModalClient}>
   
        <ModalBody> 
        <DetailsClient  Id_Client={this.state.Id_Client} />
        </ModalBody>

      </Modal> 
      {/*modal client end */}        
      </div>
      
    )
  }
}