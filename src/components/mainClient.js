import React, { Component } from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import DetailFormationComponent from './DetailFormationComponent';
import DetailCentreComponent from './DetailsCentreComponent';
import Home from './HomeComponent';
import Formation from "./Formation";
import CentreFormation from "./CentreFormation";

import ModifierImageClient from './Client/Modifier_Image_Client';
import Profile_Client from './Client/Profile_Client';
import ModifierProfile from './Client/Modifier_Profile'

import axios from 'axios';

class MainClient extends Component {
    constructor(props){
      super(props);
      this.state = {
       
        Formation: [],
        Centre: []
     };
    }

    //Récupérer les formtaions de la base de données
    componentDidMount() {
        axios.get('http://localhost:5000/Formation/')
          .then(formation => {
            this.setState({ Formation: formation.data })
          })
          .catch((error) => {
            console.log(error);
          })

          axios.get('http://localhost:5000/Centre/')
          .then(centre => {
            this.setState({ Centre: centre.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }

    render() {
        //Acceder aux detatils de la formation qui possede l'ID de la formation dont on a cliqué sur son Card
        const FormationWithId = ({match}) => {
          return(
            <DetailFormationComponent formation={this.state.Formation.filter((formation) => formation._id === match.params.formationId)[0]} 
                   />
          );
        };  
          //Acceder aux detatils du centre qui possede l'ID du centre dont on a cliqué sur son Card
        const CentreWithId = ({match}) => {
          return(
            <DetailCentreComponent centre={this.state.Centre.filter((centre) => centre._id === match.params.centreId)[0]} 
                   />
          );
        };
         
        return(
    <BrowserRouter>
    
    <Route>
        <Route exact path="/"  component={Home} />
        <Route path='/DetailFormation/:formationId' component={FormationWithId} />
        <Route path='/DetailCentre/:centreId' component={CentreWithId} />
        <Route path="/Formation" exact component={Formation} /> 
        <Route path="/CentreFormation" exact component={CentreFormation} />       
        
        <Route path="/profileClient" component={Profile_Client} />
        <Route path="/ModifierProfile/:id" component={ModifierProfile} />
        <Route path="/ModifierImageClient/:id" component={ModifierImageClient} />
    </Route>
    
    </BrowserRouter>
        );
}}
export default MainClient;