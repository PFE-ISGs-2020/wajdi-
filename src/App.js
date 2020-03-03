import React,{Component} from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
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
    
  
    <Header />
    
    <Route path="/home"  component={Home} />
    <Route path="/ResponsablesList" exact component={ResponsablesList} />
    <Redirect to="/home" />
    <div id="footer"><Footer /></div>
    
   
    
    </BrowserRouter>
    
    
  );
  }
}

export default App;
