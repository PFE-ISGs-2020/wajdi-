import React,{Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/HomeComponent';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import DemandeList from './components/DemandeComponent';
import loginwebmaster from './components/LoginWebmaster';
import HomeWebmaster from './components/HomeWebmaster';
 class App extends Component {   
  render() {
  return (
  
  <div>
   
        
    <BrowserRouter>
      <Header /> 
  
    <Route path="/homewebmaster" exact component={HomeWebmaster} />
    <Route path="/home"  component={Home} />

    <Route path="/demandes" exact component={DemandeList} />
    <Route path="/loginwebmaster" exact component={loginwebmaster} />
    <div id="footer"><Footer /></div>
    
    
    
    </BrowserRouter>
    </div>
    
  );
  }
}

export default App;
