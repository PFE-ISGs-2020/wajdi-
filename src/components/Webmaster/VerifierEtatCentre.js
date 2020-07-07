import React, { Component } from "react"; 
import SideNavWebmaster from './sideNavWebmaster'
import DefaultImg from '../../assets/default-img.jpg';
import axios from 'axios';
import {Button} from 'reactstrap';

class VerifierEtatCentre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Centre:[],
            centre:""
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
        .then(alert("compte desactivée"));       
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
              <h3> Verifier Etat Centre </h3>
              <br/>
              <br/>             
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>Logo</th> 
                    <th>Nom Centre</th> 
                    <th>Tel Centre</th> 
                    <th>Region Centre</th>                     
                    <th> Désactivation compte</th>
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
                            <td>{currentCentre.TelCentre}</td>
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
                        </tr>
                    );                
                  })
                }
                </tbody>
              </table>
              </section>
            </div>
  
          </div>
        </div>
      </div>
    );
  
    }
}
export default VerifierEtatCentre ;