import React,{Component} from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
        <Route path="/DemandeList" exact component={DemandeList} />
        <Route path="/ajoutformation" exact component={ajoutformation} />
    
        <Route path="/homewebmaster" exact component={HomeWebmaster} />
        <Route path="/loginwebmaster" exact component={loginwebmaster} />
<<<<<<< HEAD
        <Redirect to="/home" />
=======
>>>>>>> 63f7724eaf13fe698bd2135097a745bf2ca44dd4
        {/* <Route render={() => <h1>Page not found</h1>} /> */}
      </div>

      <div id="footer">
        <Footer />
      </div>
     </BrowserRouter>
    
    
  );
  }
}

export default App;