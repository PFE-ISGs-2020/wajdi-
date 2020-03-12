import React, { Component } from 'react';
import {Carousel, Jumbotron,InputGroup,Dropdown,DropdownButton,FormControl,Button,Pagination,Card} from 'react-bootstrap';
import axios from 'axios';
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

class Home extends Component {
    constructor(props) {
        super(props);
        this.onChangeCritere = this.onChangeCritere.bind(this);
        this.state = {Formation: [],
                        selectedFormation : null,
                        Critere: null}
    
      }
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
      }
     
      
      render() {
          
          
        //pour chaque formation on va utiliser la methode RenderFormation pour l'afficher dans une "Card"
        const Formations = this.state.Formation.map((formation => {
            return (
                <div className="col-12  m-1"  key={formation._id}>
                    <RenderFormations formation={formation}  />
                    <br/>
                </div>
            );
        }))

        

        
        return (
        <div className="container">
            <br/>
            {/* Carousel slider */}
            <div className="row-12 justify-content-center">
                <Jumbotron>
                    <Carousel>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src=""
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src=" "
                            alt="Third slide"
                            />
                            <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src=" "
                            alt="Third slide"
                            />
                            <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>  
                </Jumbotron>
            </div>
            {/* searching bar and button */}
            <div className="row-12 justify-content-center">
            <InputGroup  className="mb-3">
                <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title='Centre'
                id="input-group-dropdown-1" type="select"   value={this.state.Critere} onChange={this.onChangeCritere} name="Critere">
                
                <Dropdown.Item href="#">Centre</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#">Formation</Dropdown.Item>                
                </DropdownButton>
                <FormControl aria-describedby="basic-addon1" />

                <Button variant="outline-secondary">GO!!</Button>
            </InputGroup>
            </div>

            {/* Affichage des Cards des Formations*/}
            <div className="row-12 justify-content-center">
            
                    {Formations}
            
            </div>
            <br/>
            {/* Pagination */}
            <div className="row justify-content-center">
            <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item >{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>


            </div>
            
       </div>
        );
    }
}

export default Home;