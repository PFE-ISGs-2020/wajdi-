import React,{Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/HomeComponent';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import ResponsablesList from './components/ResponsablesRequests';

 class App extends Component {   
  render() {
  return (
    <BrowserRouter>
    <div>
  
    <Header />
    
    <Route path="/home"  component={Home} />
    <Route path="/ResponsablesList" exact component={ResponsablesList} />
    <div id="footer"><Footer /></div>
    
    </div>
    
    </BrowserRouter>
    
    
  );
  }
}

export default App;
