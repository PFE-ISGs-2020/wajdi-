import React,{Component} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
 
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';

import Home from './components/HomeComponent';

//Responsable imports begin
import DashboardResponsable from './components/Responsable/DashboardResponsable';
import FormationList from './components/Responsable/Liste_Formations';
import AjoutFormation from './components/Responsable/Ajout_Formation';
import ModiferFormation from'./components/Responsable/Modifier_Formation';
import FormateurList from'./components/Responsable/Liste_Formateur';
import AjoutFormateur from './components/Responsable/Ajout_Formateur';
import ModiferFormateur from'./components/Responsable/Modifier_Formateur';
//Responsable imports end

import HomeWebmaster from './components/Webmaster/HomeWebmaster';
import DemandeList from './components/Webmaster/DemandeCentre';

import loginwebmaster from './components/LoginWebmaster';
import MainClient from './components/mainClient';


import { Provider } from "react-redux";
import store from "./store";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {setCurrentCentre, logoutCentre } from "./actions/authActions";
//import PrivateRoute from "./components/private-route/PrivateRoute";

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
 class App extends Component {   
  render() {

    return (
    <Provider store={store}>
    <BrowserRouter >
      <div id="header">
        <Header />
      </div>
      <div id="Body">
        <MainClient/>
        <Switch>
        <Route path="/Home" exact component={Home} />
        <Route path="/DemandeList" exact component={DemandeList} />
       
          <Route path="/FormationList" exact component={FormationList} />        
          <Route path="/AjoutFormation" exact component={AjoutFormation} />
          <Route path="/ModiferFormation/:id" exact component={ModiferFormation} />

          <Route path="/FormateurList" exact component={FormateurList} />
          <Route path="/AjoutFormateur" exact component={AjoutFormateur} />
          <Route path="/ModiferFormateur/:id" exact component={ModiferFormateur} />
      
        
        <Route path="/DashboardResponsable" component={DashboardResponsable} />  
        <Route path="/homewebmaster" exact component={HomeWebmaster} />
        <Route path="/loginwebmaster" exact component={loginwebmaster} />
     
  
        </Switch>
      </div>
      {/*  <Switch>
        <PrivateRoute exact path="/DashboardResponsable" component={DashboardResponsable} />
      </Switch> */} 
      <div id="footer">
        <Footer />
      </div>
     </BrowserRouter>
     </Provider> 
    
    
  );
  }
}

export default App;