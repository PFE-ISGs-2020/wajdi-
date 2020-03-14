import React, { Component } from 'react';
import {Carousel, Jumbotron,InputGroup,Dropdown,DropdownButton,FormControl,Button,Pagination,Card} from 'react-bootstrap';
import axios from 'axios';
import {  Form, FormGroup, Input, Label, Col  } from 'reactstrap';
import { Link } from 'react-router-dom';

//fonction qui permet d'afficher une formation dans une "Card"

function RenderFormations ({formation}) {
   
     
    return (
        
        <Card>
            
              <Link to= {`/home/DetailFormation/${formation._id}`} > 
            <Card.Header as="h5">{formation.LibelleFormation}</Card.Header>
                <Card.Body>
                    <Card.Title>Description:</Card.Title>
                    <Card.Text>{formation.DescriptionFormation}</Card.Text>
                </Card.Body>
            </Link>
         </Card>
        
    );
}            

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.onChangeCritere = this.onChangeCritere.bind(this);
        this.onchange = this.onchange.bind(this);
        
        this.state = {Formation: [],
                        Centre: [],
                        selectedFormation : null,
         // l'attribut critere prend deux valeurs: centre ou formation il represente le critere de recherche
                        Critere:'',
                        search: ''}
    
      }
      //on change for the search bar
      onchange = e => {
        this.setState({ search: e.target.value });
      };
      onChangeCritere(e) {
        this.setState({
            Critere: e.target.value
        });
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
       /*    
          //Récupérer les centres de la base de données
          axios.get('http://localhost:5000/Centre/')
          .then(centre => {
            this.setState({ Centre: center.data })
          })
          .catch((error) => {
            console.log(error);
          }) */
      }
      
      
      render() {
        const { search } = this.state;
        const filteredFormations = this.state.Formation.filter(formation => {
          return formation.LibelleFormation.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        }); 

        return(
        
        <div className="container">
        <div className="row-12 justify-content-center">
        <InputGroup  className="mb-3 ">
        
             <Input className=" col-2 form-control"  required type="select"   value={this.state.Critere} onChange={this.onChangeCritere} name="Critere">
                        
                        <option>Centre</option>
                        <option>Formation</option>
              </Input>   
              
            <FormControl aria-describedby="basic-addon1" 
              onChange={this.onchange} />

            <Button className="col-1" variant="outline-secondary">GO!!</Button>
            </InputGroup>
            <div className="row">
          {/*if (Critere == "Centre"){
            filteredCentres.map(centre => { 
              return <RenderCentres centre={centre}  />;
             })
          }
        else*/}
          {filteredFormations.map(formation => { 
           return <RenderFormations formation={formation}  />;
          })}
        </div>
        </div>
        
        </div>
);
}

}

export default SearchBar;