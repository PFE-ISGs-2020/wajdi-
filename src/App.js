import React,{Component} from 'react';
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import DemandeList from './components/DemandeCentre';
import Home from './components/HomeComponent';
import ajoutformation from './components/AjoutFormation';
import FormationList from './components/Liste_Formations';
import ModiferFormation from'./components/ModiferFormation';

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
        <Route path="/DemandeList" exact component={DemandeList} />
        <Route path="/ajoutformation" exact component={ajoutformation} />
              
        <Route path="/" exact component={Home} />
        <Route path="/DashboardResponsable" component={DashboardResponsable} />  
        <Route path="/homewebmaster" exact component={HomeWebmaster} />
        <Route path="/loginwebmaster" exact component={loginwebmaster} />
        <Redirect to="/" />
        {/* <Route render={() => <h1>Page not found</h1>} /> */}
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