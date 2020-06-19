import React, { Component } from 'react';
import {Button, Modal,  ModalBody} from 'reactstrap';
import axios from 'axios';
import DetailsClient from '../Details_Client';

import {Breadcrumb, BreadcrumbItem} from 'react-bootstrap';
import SideBar from "./sidebar";
import moment from 'moment'

const Inscription = props => (  
  <tr>
    
    <td>{props.inscriptions.Id_Client.NomClient}</td>
    <td>{props.inscriptions.Id_Client.PrenomClient}</td>
    <td>{moment(props.inscriptions.createdAt).format('DD/MM/YYYY')}</td>
    <td>{moment(props.inscriptions.updatedAt).format('DD/MM/YYYY')}</td>
   <td>
    
      <Button className="btn btn-secondary btn-sm" onClick={ () => { props.toggleModalClient(props.inscriptions.Id_Client._id)}}>
                          
        <span className="fa fa-info "></span>
       
      </Button>
   
    </td>                       
  </tr>
)

export default class InscriptionList extends Component {
  constructor(props) {
    super(props);

    this.toggleModalClient = this.toggleModalClient.bind(this)
    
    this.state = {  
                    Details : null,
                    Formation: null,
                    isModalClientOpen: false,
                    Id_Client: null,
                    inscriptions: []
                   };
  }
  

  componentDidMount() {

      axios.get('http://localhost:5000/Details_Inscription/List/'+this.props.match.params.id)
      .then(det => {
        this.setState({ inscriptions: det.data, })
        
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


  InscriptionList() {
    return this.state.inscriptions.map(currentdetails => {
    return <Inscription   inscriptions={currentdetails} key={currentdetails._id}  
     toggleModalClient={this.toggleModalClient} />;
    });
  }   

  render() {
    if (!this.state.inscriptions[0]){
      return(
        <div>
        <SideBar pageWrapId={"page-wrap"} />
        <div id="page-wrap">
          <div className=" container ">
        <div className="row justify-content-md-center">  
        <section className="col-10 text-center">   
        <Breadcrumb>
              <BreadcrumbItem href="/FormationList">Liste Des Formations</BreadcrumbItem>
              <BreadcrumbItem active>Liste Des Inscrits</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <br/>
              <br/>
              <h3>Liste des Inscrits à la Formation { this.state.Formation} </h3>
              <br/>
              <br/>
              <br/>
              <br/>
              <h4 >
                Il n'y aucune inscription pour le moment
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
              <BreadcrumbItem active>Liste Des Inscrits</BreadcrumbItem>
            </Breadcrumb>
                    <div className="col-12">
                        <br/>
                        <br/>
                        <h3>Liste des Inscrits à la Formation { this.state.Formation}</h3> 
                        <br/>
                        <br/>
                    </div>
                        
                    <table className="table">
                    <thead className="thead-light">
                    <tr>
                      
                      <th>Nom Client</th>
                      <th>Prenom Client</th>
                      <th>Date Demande Inscription</th>
                      <th>Date Validation Inscription</th>
                      <th>Plus de détails</th>
                    </tr>
                  </thead>
                  <tbody>
                    { this.InscriptionList() }
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
    )}
  }
}