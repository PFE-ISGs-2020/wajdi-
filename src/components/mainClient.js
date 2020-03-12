import React, { Component } from 'react';
import {Switch, Route, Redirect , withRouter} from 'react-router-dom';
import DetailFormationComponent from './DetailFormationComponent';
import Home from './HomeComponent';
import axios from 'axios';

class MainClient extends Component {
    constructor(props){
      super(props);
      this.state = {
       
        Formation: []
     };
    }

    //Récupérer les formtaions de la base de données
    componentDidMount() {
        axios.get('http://localhost:5000/Formation/')
          .then(formation => {
            this.setState({ Formation: formation.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }

    render() {
        //Acceder aux detatils de la formation qui possede l'ID de la formation dont on a cliquer sur son Card
        const FormationWithId = ({match}) => {
            return(
                <DetailFormationComponent formation={this.state.Formation.filter((formation) => formation._id === match.params.formationId)[0]} 
                   />
            );
          };
         
        return(
            <div>
    <Switch>
        <Route exact path="/home"  component={Home} />
        <Route path='/home/DetailFormation/:formationId' component={FormationWithId} />
    </Switch></div>
        );
}}
export default MainClient;
