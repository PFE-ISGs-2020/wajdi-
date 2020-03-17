import React, { Component } from 'react';
import {InputGroup,FormControl,Button,Card,Form} from 'react-bootstrap';
import axios from 'axios';
import { Input } from 'reactstrap';
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

function RenderCentres ({centre}) {    
    return (        
        <Card>            
            <Link to= {`/home/DetailFormationw/${centre._id}`} > 
                <Card.Header as="h5">{centre.NomCentre}</Card.Header>
                <Card.Body>
                    <Card.Title>Description:</Card.Title>
                    <Card.Text>{centre.DescriptionCentre}</Card.Text>
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
                      Centre:[],
                        selectedFormation : null,
                        Critere:'',
                        search: ''}    
      }
            

      //on change for the search bar
      onchange = e => {
        this.setState({ search: e.target.value });

      };

      onChangeCritere = e => {
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

          axios.get('http://localhost:5000/Centre/')
          .then(centre => {
            this.setState({ Centre: centre.data })
          })
          .catch((error) => {
            console.log(error);
          })

      }   

  
      render() {  
        const  {search} = this.state;
            
        const filteredFormations = this.state.Formation.filter(formation => {
        return formation.LibelleFormation.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        }); 

        const filteredCentres = this.state.Centre.filter(centre => {
            return centre.NomCentre.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });

        let list ;
        if (this.state.Critere === "Formation") {
            list=filteredFormations.map(formation => { 
                    return  <div>
                    <RenderFormations formation={formation}  />
                    <br/>
                    </div>;
                    })
        } else {
            list=filteredCentres.map(centre => { 
                    return  <div>
                            <RenderCentres centre={centre}  />
                            <br/>
                            </div>;
                    }) ; 
        }
        
        return(        
        <div className="container">
            <div className="row-12 justify-content-center">
                <Form >
                    <InputGroup  className="mb-3">            
                        <Input className=" col-2 form-control"  required type="select"   
                        value={this.state.Critere} onChange={this.onChangeCritere} name="Critere">
                            <option>Centre</option>
                            <option>Formation</option>
                        </Input>   
                        
                        <FormControl aria-describedby="basic-addon1" 
                        onChange={this.onchange} />

                        <Button className="col-1" variant="outline-secondary" type="submit">GO!!</Button>
                    </InputGroup>
                </Form>           

               <div className="row-12 justify-content-center" >
                     
               </div>            

                {list}
            </div>
        
        </div>
);
}

}

export default SearchBar;