import React, { Component } from 'react';
import {InputGroup,FormControl,Card,Form} from 'react-bootstrap';
import axios from 'axios';
import { Input } from 'reactstrap';
import { Link } from 'react-router-dom';


//fonction qui permet d'afficher une formation dans une "Card"
function RenderFormations ({formation}) {    
    return ( 
        <Card  className="card ">            
            <Link to= {"/DetailFormation/"+ formation._id}  style={{color:"black",textDecorationLine:"none" }} > 
                <Card.Header className="cardhead" as="h5"  >{formation.LibelleFormation}</Card.Header>
                <Card.Body className="cardbody">
                    <Card.Title>Description:</Card.Title>
                    <Card.Text>{formation.DescriptionFormation}</Card.Text>
                </Card.Body>
            </Link>            
         </Card>       
    );
}   

//fonction qui permet d'afficher un centre dans une "Card"
function RenderCentres ({centre}) {   
    return (        
        <Card className="card">            
            <Link to= {"/DetailCentre/"+ centre._id} style={{color:"black",textDecorationLine:"none" }} > 
                <Card.Header className="cardhead" as="h5">{centre.NomCentre}</Card.Header>
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
                        Critere:"Formation",
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
    
      componentDidMount() {
        //Récupérer les formtaions de la base de données
        axios.get('http://localhost:5000/Formation/')
          .then(formation => {
            this.setState({ Formation: formation.data })
          })
          .catch((error) => {
            console.log(error);
        })
        //Récupérer les centres de la base de données
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
                    <RenderFormations formation={formation}  key={formation._id}/>
                    
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
                <Form>
                    <InputGroup  className="mb-3 searchbar">            
                        <Input className=" col-2 form-control critere"  
                        required type="select"    
                        style={{
                        backgroundColor: "#FCCA92",
                        borderRightStyle: "solid",
                        borderRightWidth: "1px",
                        borderRightColor:"#0A3642",
                        color:"#0A3642"}}
                        value={this.state.Critere} 
                        onChange={this.onChangeCritere} 
                        name="Critere">
                            <option>Formation</option>
                            <option>Centre</option>
                        </Input>   
                        
                        <FormControl aria-describedby="basic-addon1" 
                        style={{borderLeftStyleStyle: "solid",
                                borderLeftWidthWidth: "1px",
                                borderLeftColor:"#0A3642" }}
                        onChange={this.onchange} />

                    </InputGroup>
                </Form> 

            </div>
                {list}                                      
                
        </div>
);
}

}

export default SearchBar;