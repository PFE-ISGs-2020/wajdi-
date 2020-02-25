import React,{Component} from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/HomeComponent';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
 class App extends Component {   
  render() {
  return (
    <BrowserRouter>
    <div>
         
    <Header />
    <div id="body"><Home/></div>
    <div id="footer"><Footer /></div>
    
    </div>
    </BrowserRouter>
  );
  }
}

export default App;
