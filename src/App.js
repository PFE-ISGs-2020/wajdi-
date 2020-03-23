import React,{Component} from 'react';
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import DemandeList from './components/DemandeCentre';
import Home from './components/HomeComponent';

import FormationList from './components/Liste_Formations';
import ajoutformation from './components/Ajout_Formation';
import ModiferFormation from'./components/Modifier_Formation';

import FormateurList from'./components/Liste_Formateur';
import ajoutformateur from './components/Ajout_Formateur';
import ModiferFormateur from'./components/Modifier_Formateur';


import HomeWebmaster from './components/HomeWebmaster';
import loginwebmaster from './components/LoginWebmaster';
import MainClient from './components/mainClient';
import DashboardResponsable from './components/DashboardResponsable';

import { Provider } from "react-redux";
import store from "./store";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser, setCurrentCentre, logoutCentre } from "./actions/authActions";
import PrivateRoute from "./components/private-route/PrivateRoute";

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
    window.location.href = "./";
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
      <div id="body">
        <MainClient/>
        <Switch>
        <Route path="/Home" exact component={Home} />
        <Route path="/DemandeList" exact component={DemandeList} />
       
          <Route path="/FormationList" exact component={FormationList} />        
          <Route path="/ajoutformation" exact component={ajoutformation} />
          <Route path="/ModiferFormation/:id" exact component={ModiferFormation} />

          <Route path="/FormateurList" exact component={FormateurList} />
          <Route path="/ajoutformateur" exact component={ajoutformateur} />
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