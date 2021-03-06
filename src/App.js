import React,{Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

//Responsable imports begin
import ProfileCentre  from './components/Responsable/Profile_Centre';
import DashboardResponsable from './components/Responsable/DashboardResponsable';
import FormationList from './components/Responsable/Liste_Formations';
import AjoutFormation from './components/Responsable/Ajout_Formation';
import ModiferFormation from'./components/Responsable/Modifier_Formation';
import FormateurList from'./components/Responsable/Liste_Formateur';
import AjoutFormateur from './components/Responsable/Ajout_Formateur';
import ModiferFormateur from'./components/Responsable/Modifier_Formateur';
import ModifierPasswordCentre from './components/Responsable/Modifier_Password_Centre';
import DemandeInscriptionList from './components/Responsable/Demandes_Inscription';
import ModifierCentre from './components/Responsable/Modifier_Centre';
import Inscriptions_Formations from './components/Responsable/Inscriptions_Formations';
//Responsable imports end

//Webmaster imports begin
import DemandeList from './components/Webmaster/DemandeCentre';
import ThemeList from './components/Webmaster/Liste_Themes';
import DashboardWebmaster from './components/Webmaster/DashboardWebmaster';
import VerifierEtatCentre from './components/Webmaster/VerifierEtatCentre';

import loginwebmaster from './components/Webmaster/LoginWebmaster';
//Webmaster imports end

import MainClient from './components/mainClient';


import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import setAuthClientToken from "./utils/setAuthClientToken";
import {setCurrentCentre, logoutCentre } from "./actions/authActions";
import img from './components/image';
import {setCurrentClient, logoutClient } from "./actions/authActionsClient";

// Check for token to keep centre logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get centre info and exp
  const decoded = jwt_decode(token);
  // Set centre and isAuthenticated
  store.dispatch(setCurrentCentre(decoded));

// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout centre
    store.dispatch(logoutCentre());
    // Redirect to home
    window.location.href = "/";
  }
}
// Check for tokenClient to keep client logged in
if (localStorage.jwtToken) {
  // Set auth tokenClient header auth
  const tokenClient = localStorage.jwtToken;
  setAuthClientToken(tokenClient);
  // Decode tokenClient and get client info and exp
  const decoded = jwt_decode(tokenClient);
  // Set client and isAuthenticated
  store.dispatch(setCurrentClient(decoded));

// Check for expired tokenClient
  const currentTimeClient = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTimeClient) {
    // Logout client
    store.dispatch(logoutClient());
    // Redirect to home
    window.location.href = "/";
  }

}
 class App extends Component {   
  render() {

    return (
    <Provider store={store}>
    <BrowserRouter >
      
      <div className="Body">
        <MainClient/>
        <Switch>
         
         
        {/* Responsable */}
        

          <Route path="/ProfileCentre" exact component={ProfileCentre} /> 
          <Route path="/ModiferCentre/:id" exact component={ModifierCentre} />   
          <Route path="/ModifierPasswordCentre" exact component={ModifierPasswordCentre} />  
          <Route path="/FormationList" exact component={FormationList} />        
          <Route path="/AjoutFormation" exact component={AjoutFormation} />
          <Route path="/ModiferFormation/:id" exact component={ModiferFormation} />

          <Route path="/FormateurList" exact component={FormateurList} />
          <Route path="/AjoutFormateur" exact component={AjoutFormateur} />
          <Route path="/ModiferFormateur/:id" exact component={ModiferFormateur} />
          <Route path="/InscriptionList/:id" exact component={Inscriptions_Formations} />
          <Route path="/DemandeInscriptionList/:id" exact component={DemandeInscriptionList} /> 
        
        <Route path="/DashboardResponsable" component={DashboardResponsable} />  

      
        
        {/* Webmaster */}
        <Route path="/loginwebmaster" exact component={loginwebmaster} />
        <Route path="/DemandeList" exact component={DemandeList} />
        <Route path="/img" exact component={img} />
        <Route path="/ThemeList" exact component={ThemeList} />
        <Route path="/DashboardWebmaster" exact component={DashboardWebmaster} />
        <Route path="/VerifierEtatCentre" exact component={VerifierEtatCentre} />
        
        </Switch>
      </div>
    
     </BrowserRouter>
     </Provider> 
    
    
  );
  }
}

export default App;