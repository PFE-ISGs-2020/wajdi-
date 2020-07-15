import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem} from 'react-bootstrap';
import Header from './HeaderComponent';
import HeaderClient from './Header_Client';
import Footer from './FooterComponent';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TunFormation from "../img/TunFormation.png"

class QuiSommesNous extends Component {
    constructor(props) {
        super(props);      
        this.state = {Formation: [],
                      client:this.props.auth }
   
      }    

      render() {   
        const {client} = this.props.authClient;
        const header = (client === null) ?
          <Header /> 
        :       
          <HeaderClient />
        return (
        <div> 
        {header}

        <div className="container">         
            <br/>
            {/*BreadCrumb begin */}
            <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
                            <BreadcrumbItem active>Qui Sommes Nous?</BreadcrumbItem>
                        </Breadcrumb>
            {/*BreadCrumb end */}
            <div className = "jumbotron">
            <div className = "container">
            <div className = "row row-header">
                <div className = "col-12 col-sm-6">
                    <h1>TunFormation</h1>
                    <p>Nous nous inspirons des meilleures applications éxistantes, pour vous offrir une expérience unique.
                        <br/> Votre satisfaction est notre objectif!</p>
                </div>
                <div className="offset-2">
                    <img src={TunFormation} width= "160 px" height="160px" alt="Logo de l'application"/>
                </div>
            </div>
        </div>
    </div> 
                
                        <div className="col-12">
                        <h3>Qui Sommes Nous?</h3>
                            <hr />
                            <p>Il s’agit d’une application qui contient des informations sur les centres de formation en Tunisie mis à la disposition des entreprises, 
                              des salariés et des étudiants à la recherche de formations et de perfectionnement.
                            </p>
                            <p>  Cette application fournit un service autorisant les centres de formation en Tunisie 
                              à publier des informations générales sur eux, de publier des annonces de formation, de gérer les formations publiées, 
                              de gérer leurs formateurs … et les clients de chercher et s’inscrire à une formation.                             
                            </p>
                        </div>                
                    </div>
                    
                    
            <br/>
            
            <br/>                      
          </div>  
          <Footer />  
        </div>
        );
    }
}


QuiSommesNous.propTypes = {
  authClient: PropTypes.object.isRequired
};  

const mapStateToProps = state => ({
  authClient: state.authClient
});

export default  connect(mapStateToProps)(QuiSommesNous);