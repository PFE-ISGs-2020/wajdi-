import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem,Button} from 'react-bootstrap';
import axios from 'axios';
import Moment from 'react-moment';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from './HeaderComponent';
import HeaderClient from './Header_Client';
import DefaultImg from '../assets/default-img.jpg';

class DetailFormationComponent extends Component {  
  
    constructor(props) {
        super(props);

        this.state = {
            formationn:this.props.formation ? this.props.formation:JSON.parse(localStorage.getItem('object'))
  
        };          
    }
    
    componentDidMount() {
        //if we refresh and id get lost from the state we store it locally
        if(this.props.formation!==undefined)
        localStorage.setItem("object", JSON.stringify(this.props.formation));

        const {formationn} = this.state;
        let ID_Formation = formationn ? formationn._id : "";
        //Request to get "formation" details by its ID
        axios.get('http://localhost:5000/Formation/'+ID_Formation)
          .then( formation => {
            if (this._isMounted) {
            this.setState({ formationn: formation.data })
            console.log(this.props.formation);
            }
        })

      } 

    render(){
        const {formationn} = this.state;
        let LibelleFormation = formationn ? formationn.LibelleFormation : "";
        let DateDebutFormation = formationn ? formationn.DateDebutFormation : "";
        let DateFinFormation = formationn ? formationn.DateFinFormation : "";
        let DescriptionFormation = formationn ? formationn.DescriptionFormation : "";
        let NomTheme = formationn ? formationn.NomTheme : "";
        let NomFormateur = formationn ? formationn.NomFormateur : "";
        let CapaciteFormation = formationn ? formationn.CapaciteFormation : "";
        let NomCentre = formationn ? formationn.NomCentre : "";
        let image = formationn ? formationn.imageFormation : "";
        
        let imageFormation = DefaultImg;
        if (image){
            imageFormation = "http://localhost:5000/"+image

        const {client} = this.props.authClient;
        const header = (client === null) ?
          <Header /> 
        :       
          <HeaderClient />

        return(
            <div>
                 {header}
                <div className="container">
                    <br/>
                    {/*BreadCrumb begin */}
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
                            <BreadcrumbItem active>{LibelleFormation}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                        <h3>{LibelleFormation}</h3>
                            <hr />
                        </div>                
                    </div>
                    {/*BreadCrumb end */}
                
                    <div className="container">    
                        {/* showing details  begin*/}
                        <div className="row">                 
                            <img src={imageFormation} alt="photo_de_la_formation" width="600px" height="300px"/>                      
                        </div>
                        <br/>
                        <div>
                        <div className="row"> 
                            <p><b><span className="fa fa-university"></span> Nom du centre:</b> {NomCentre}</p>
                        </div>
                        <div className="row">
                            <p><b><span className="fa fa-calendar"></span> Date debut: </b>    
                            <Moment format="DD/MM/YYYY">{DateDebutFormation}</Moment></p> 
                        </div> 
                        <div className="row">                        
                            <p><b><span className="fa fa-calendar"></span> Date fin:</b>  
                            <Moment format="DD/MM/YYYY">{DateFinFormation}</Moment> </p>                        
                        </div>             
                        <div className="row ">
                            <p><b><span className="fa fa-tag"></span> Theme:</b> {NomTheme}</p>
                        </div>
                        <div className="row ">
                            <p><b> <span className="fa fa-user"></span> Formateur:</b> {NomFormateur}</p>
                        </div> 
                        <div className="row ">
                            <p><span className="fa fa-users"></span><b> Capacité:</b> {CapaciteFormation}</p>
                        </div> 
                        <div className="row">
                            <p><span className="fa fa-align-justify"></span><b> Description:</b> {DescriptionFormation}</p>
                        </div> 
                        {/* showing details  end*/}

                        {/* s'inscrire Button  begin*/}
                        <div className="form-group row" onClick={()=>

                            {
                                if(client){
                                    const inscription = {
                                    Id_Client:client.id,
                                    NomClient:client.NomClient ,
                                    PrenomClient:client.PrenomClient,
                                    EtatInscription:false,
                                    Id_Formation: this.state.formationn._id
                                    }
                                console.log(inscription);
                                axios.post('http://localhost:5000/Details_Inscription/add', inscription)
                                .then(res => console.log(res.data))        
                                    alert("vous etes inscrit avec succee");
                                }
                                else{
                                    alert("Il faut etre inscrit");
                                }

                            } 

                        
                        }>  
                            <Button type="submit" color="primary">
                                S'inscrire
                            </Button>
                            <br/>
                        </div>   

                        {/* s'inscrire Button  end*/}
                        <br/>
                        <br/>
                        </div>
                    </div>
                </div>
            </div>
    );    

}
}
}

DetailFormationComponent.propTypes = {
    authClient: PropTypes.object.isRequired
  };  
  
  const mapStateToProps = state => ({
    authClient: state.authClient
  });
  
export default connect(mapStateToProps)(DetailFormationComponent);