import React,{Component} from 'react';
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import DemandeList from './components/DemandeComponent';
import ajoutformation from './components/AjoutFormationComponent';
import HomeWebmaster from './components/HomeWebmaster';
import loginwebmaster from './components/LoginWebmaster';
import MainClient from './components/mainClient';
import DashboardResponsable from './components/DashboardResponsable';
 
 class App extends Component {   
  render() {

    return (

    <BrowserRouter>
      <div id="header">
        <Header />
      </div>
      <div id="body">
        <MainClient/>
        <Switch>
        <Route path="/DemandeList" exact component={DemandeList} />
        <Route path="/ajoutformation" exact component={ajoutformation} />
      
        <Route path="/DashboardResponsable" component={DashboardResponsable} />
        <Route path="/homewebmaster" exact component={HomeWebmaster} />
        <Route path="/loginwebmaster" exact component={loginwebmaster} />
        <Redirect to="/home" />
        {/* <Route render={() => <h1>Page not found</h1>} /> */}
        </Switch>
      </div>

      <div id="footer">
        <Footer />
      </div>
     </BrowserRouter>
    
    
  );
  }
}

export default App;