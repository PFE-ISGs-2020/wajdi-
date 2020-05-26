  
import React, { Component } from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import DetailFormationComponent from './DetailFormationComponent';
import DetailCentreComponent from './DetailsCentreComponent';
import Home from './HomeComponent';
import Formation from "./Formation";
import CentreFormation from "./CentreFormation";
import QuiSommesNous from "./Qui_Sommes_Nous";
import ModifierPasswordClient from './Client/Modifier_Password_Client';
import ModifierImageClient from './Client/Modifier_Image_Client';
import Profile_Client from './Client/Profile_Client';
import ModifierProfile from './Client/Modifier_Profile'
import MesAchats from './Client/Mes_Achats'
import MesDemandes from './Client/Mes_Demandes'

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
        <Route path="/Formations" exact component={Formation} /> 
        <Route path="/CentresFormation" exact component={CentreFormation} />       
        <Route path="/QuiSommesNous" exact component={QuiSommesNous} />
        <Route path="/MesAchats" exact component={MesAchats} />
        <Route path="/profileClient" component={Profile_Client} />
        <Route path="/ModifierProfile/:id" component={ModifierProfile} />
        <Route path="/ModifierPasswordClient/:id" component={ModifierPasswordClient} />
        <Route path="/ModifierImageClient/:id" component={ModifierImageClient} />
        <Route path="/MesDemandes/:id" component={MesDemandes} />
    </Route>
    
    </BrowserRouter>
        );
}}
export default MainClient;