import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem} from 'react-bootstrap';
import Header from './HeaderComponent';
import HeaderClient from './Header_Client';
import Footer from './FooterComponent';
import PropTypes from "prop-types";
import { connect } from "react-redux";

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
                    <h1>Formation.Tn</h1>
                    <p>Nous nous inspirons des meilleures applications éxistantes, pour vous offrir une expérience unique.
                        <br/> Votre satisfaction est notre objectif!</p>
                </div>
                <div>
                    <img src="" alt="Logo de l'application"/>
                </div>
            </div>
        </div>
    </div> 
                
                        <div className="col-12">
                        <h3>Qui Sommes Nous?</h3>
                            <hr />
                            <p>Il s’agit d’une application contenant l’annuaire des centres de formation en Tunisie mis à la disposition des entreprises,
                             des salariés et des étudiants à la recherche de formations et de perfectionnement.
                              Il existe plusieurs types de formation présent dans ce site : des formations à long terme (formations diplômantes : BTP, BTS…), des formations à court terme ou des séminaires.
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