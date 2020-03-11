import React,{Component} from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/HomeComponent';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import DemandeList from './components/DemandeComponent';
import ajoutformation from './components/AjoutFormationComponent';
import HomeWebmaster from './components/HomeWebmaster';
import loginwebmaster from './components/LoginWebmaster';
import MainClient from './components/mainClient'
 class App extends Component {   
  render() {

   
   
  return (
    <BrowserRouter>
    
    <div id="header">
    <Header />
    </div>
    <div id="body">
      <MainClient/>
    {/* <Route exact path="/home"  component={Home} /> */}
    <Route path="/DemandeList" exact component={DemandeList} />
    <Route path="/ajoutformation" exact component={ajoutformation} />
    
    <Route path="/homewebmaster" exact component={HomeWebmaster} />
    <Route path="/loginwebmaster" exact component={loginwebmaster} />
    <Redirect to="/home" />
    
    </div>

    <div id="footer"><Footer /></div>
    
   
    
    </BrowserRouter>
    
    
  );
  }
}

export default App;
