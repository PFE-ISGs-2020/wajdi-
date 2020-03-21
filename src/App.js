import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
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
 class App extends Component {   
  render() {

    return (

      <Router>        
        <div className="Header">
        <Header />
        </div>
        <div className="Body">
        <MainClient/>        
        <Route path="/Home" exact component={Home} />

        <Route path="/DemandeList" exact component={DemandeList} />
        <Route path="/FormationList" exact component={FormationList} />
        <Route path="/ModiferFormation/:id" exact component={ModiferFormation} />
    
        <Route path="/Homewebmaster" exact component={HomeWebmaster} />
        <Route path="/loginwebmaster" exact component={loginwebmaster} />
        </div>

        <div className="Footer">
          <Footer />
        </div>
     </Router>
    
    
  );
  }
}

export default App;