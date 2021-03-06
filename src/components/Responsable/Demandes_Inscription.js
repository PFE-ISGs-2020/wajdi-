  
import React, { Component } from 'react';
import {Button, Modal,  ModalBody} from 'reactstrap';
import axios from 'axios';
import DetailsClient from '../Details_Client';
import {Breadcrumb, BreadcrumbItem} from 'react-bootstrap';
import SideBar from "./sidebar";
import moment from 'moment'

const Demande = props => (  
  <tr>
    <td>{props.details.Id_Client.NomClient}</td>
    <td>{props.details.Id_Client.PrenomClient}</td>
    <td>{moment(props.details.createdAt).format('DD/MM/YYYY')}</td>

    <td>
        <a href={"/DemandeInscriptionList/"+props.details.Id_Formation}> 
             <Button className="btn btn-success btn-sm"   
              onClick={() => { props.accepterDetails(props.details._id) }}>  
              <span className="fa fa-check"></span>
            </Button>      
         </a>          
    </td>                 
    <td>
    
      <a href={"/DemandeInscriptionList/"+props.details.Id_Formation}> 
        <Button className="btn btn-danger btn-sm"
           onClick={() => { if (window.confirm('Voulez-vous vraiment supprimer cette demande?'))
           props.supprimerDetails(props.details._id) } }   >
            <span className="fa fa-times"></span>
        </Button>
       </a> 
    </td> 
   <td>
     
      <Button className="btn btn-secondary  btn-sm" onClick={ () => { props.toggleModalClient(props.details.Id_Client._id)}}>
                          
        <span className="fa fa-info "> </span>
       
    </Button>
   
    </td>                       
  </tr>
)

export default class DemandeInscriptionList extends Component {
    constructor(props) {
      super(props);
  
      this.supprimerDetails  = this.supprimerDetails.bind(this)
      this.accepterDetails   = this.accepterDetails.bind(this)
      this.toggleModalClient = this.toggleModalClient.bind(this)
      
      this.state = {  details: [],
                      Details : null,
                      Formation: null,
                      isModalClientOpen: false,
                      Id_Client: null, 
                     };
    }
    
  
    componentDidMount() {
      
      axios.get('http://localhost:5000/Details_Inscription/Demande/'+this.props.match.params.id)
        .then(det => {
          this.setState({ details: det.data, })
          
        })
        .catch((error) => {
          console.log(error);
        })

      axios.get('http://localhost:5000/Formation/'+this.props.match.params.id)
      .then(det => {
        this.setState({ Formation: det.data.LibelleFormation, })
        
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
  
    accepterDetails(id) {
  
      const DetailsUpdated = {
  
          
          EtatInscription : 1,
          
         }
          
       axios.post('http://localhost:5000/Details_Inscription/Approve/'+ id , DetailsUpdated )
         .then(det => { console.log(det.data)});
         
     }
   
    DetailsList() {
      return this.state.details.map(currentdetails => {
      return <Demande   details={currentdetails} supprimerDetails={this.supprimerDetails} 
      key={currentdetails._id} accepterDetails={this.accepterDetails} 
       toggleModalClient={this.toggleModalClient}
      />;
  
      });
    }  
  
    render() {
      if (!this.state.details[0]){
        return(
          <div>
        <SideBar pageWrapId={"page-wrap"} />
        <div id="page-wrap">
          <div className=" container ">
          <div className="row justify-content-md-center">  
          <section className="col-10 text-center">   
          <Breadcrumb>
                            <BreadcrumbItem href="/FormationList">Liste Des Formations</BreadcrumbItem>
                            <BreadcrumbItem active>Liste Des Demandes d'Inscription</BreadcrumbItem>
                </Breadcrumb>
              <div className="col-12">
                <br/>
                <br/>
                <h3> Liste Des Demandes d'Inscription à la Formation {this.state.Formation} </h3>
                <br/>
                <br/>
                <br/>
                <br/>
                <h4 >
                  Il n'y aucune demande d'inscription pour le moment.
                </h4>  
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
          <SideBar pageWrapId={"page-wrap"} />
          <div id="page-wrap">
            <div className=" container ">
              <div className="row justify-content-md-center">  
                <section className="col-10 text-center">   
                <Breadcrumb>
                            <BreadcrumbItem href="/FormationList">Liste Des Formations</BreadcrumbItem>
                            <BreadcrumbItem active>Liste Des Demandes d'Inscription</BreadcrumbItem>
                </Breadcrumb>
                    <div className="col-12">
                      <br/>
                      <br/>
                      <h3> Liste Des Demandes d'Inscription à la Formation {this.state.Formation} </h3>
                      <br/>
                      <br/>  
                    </div>   
                    <table className="table">
                      <thead className="thead-light">
                        <tr>
                          
                          <th>Nom Client</th>
                          <th>Prenom Client</th>
                          <th>Date Demande Inscription</th>
                          <th>Accepter</th>
                          <th>Supprimer</th>
                          <th>Voir plus</th>
                        </tr>
                      </thead>
                      <tbody>
                        { this.DetailsList() }
                      </tbody>
                    </table>
                   
                </section>
              </div>
            {/*modal client begin */}
            <div className=" container ">
              <div className="row justify-content-md-center">              
                <Modal 
                isOpen={this.state.isModalClientOpen} 
                toggle={this.toggleModalClient}
                >
                  <ModalBody> 
                  <DetailsClient  Id_Client={this.state.Id_Client} />
                  </ModalBody>
                </Modal> 
              </div>
            </div>
            {/*modal client end */}        
            </div>
          </div>
        </div>
      )
    }
  }
}