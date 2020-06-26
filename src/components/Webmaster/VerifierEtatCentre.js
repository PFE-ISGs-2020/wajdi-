import React, { Component } from "react"; 
import SideNavWebmaster from './sideNavWebmaster'
import DefaultImg from '../../assets/default-img.jpg';
import axios from 'axios';
import {Button,  Modal,  ModalBody, ModalHeader} from 'reactstrap';

class VerifierEtatCentre extends Component {
    constructor(props) {
        super(props);
        this.toggleModalCentre = this.toggleModalCentre.bind(this)
        this.state = {
            Centre:[],
            centre:"",
            isModalCentreOpen: false,
            CentreInModal: []
        };          
    }
    
    componentDidMount() {
        //Récupérer les centres de la base de données
        axios.get('http://localhost:5000/Centre/List')
          .then(cent => {
            this.setState({ Centre: cent.data })
          })       
    }

    desactivate(id){
        //Récupérer les centres de la base de données
        axios.post('http://localhost:5000/Centre/desactivate/' + id)
        .then(alert("compte desactivé"));       
    } 

    toggleModalCentre(centre) {
      this.setState({
        isModalCentreOpen: !this.state.isModalCentreOpen ,
      
       CentreInModal: centre
      }); 
     
    }

render() {
  
return (    
      <div>
        <SideNavWebmaster pageWrapId={"page-wrap"}/>
        <div id="page-wrap" className="container">
          <div className="container">
          <div className="row justify-content-md-center"> 
              <section className="col-10 text-center">   
              <br/>
              <br/>
              <h3> Vérifier Etat Centre </h3>
              <br/>
              <br/>             
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>Logo</th> 
                    <th>Nom Centre</th> 
                    <th>Region Centre</th> 
                    <th> Désactiver compte</th>
                    <th>Voir Plus</th> 
                  </tr>
                </thead>
                <tbody>
                { this.state.Centre.map(currentCentre => {
                    let image = DefaultImg;
                    if (currentCentre.image){
                    image = "http://localhost:5000/"+currentCentre.image;
                    }
                    return (
                        <tr key={currentCentre._id}>
                            <td> <img src={image} alt="centre" style={{width:"50px",height:"50px" }} /></td>
                            <td>{currentCentre.NomCentre}</td>
                            <td>{currentCentre.RegionCentre}</td>
                            <td>
                                <a href="/VerifierEtatCentre">
                                    <Button className="btn btn-danger btn-sm"
                                    onClick={() => { if (window.confirm('Voulez-vous vraiment désactiver ce centre?') )
                                       this.desactivate(currentCentre._id)                                    
                                      } }   >
                                        <span className="fa fa-user-times"></span>
                                    </Button>
                                </a>
                            </td>
                            <td>
                              <Button className="btn btn-secondary btn-sm" onClick={ () => { this.toggleModalCentre( currentCentre)}}>
                                <span className="fa fa-info "></span>
                              </Button>
                            </td>
                        </tr>
                    );                
                  })
                }
                </tbody>
              </table>
              </section>
              <Modal isOpen={this.state.isModalCentreOpen} toggle={this.toggleModalCentre}>   
                <ModalHeader className="justify-content-center">
                  {this.state.CentreInModal.NomCentre} 
                </ModalHeader>
                <ModalBody> 
                  <p> <b> <span className="fa fa-university"> </span> Nom: </b> {this.state.CentreInModal.NomCentre}</p>
                  <p> <b> <span className="fa fa-map"> </span> Région: </b> {this.state.CentreInModal.RegionCentre}</p>
                  <p> <b> <span className="fa fa-map-marker"> </span> Adresse: </b> {this.state.CentreInModal.AdresseCentre}</p>
                  <p> <b> <span className="fa fa-envelope"> </span> Email: </b> {this.state.CentreInModal.EmailCentre}</p>
                  <p> <b> <span className="fa fa-phone"> </span> Tel: </b> {this.state.CentreInModal.TelCentre}</p>
                  <p> <b> <span className="fa fa-align-justify"> </span> Déscription: </b> {this.state.CentreInModal.DescriptionCentre}</p>
                </ModalBody>
              </Modal> 
            </div>
  
          </div>
        </div>
      </div>
    );
  
    }
}
export default VerifierEtatCentre ;