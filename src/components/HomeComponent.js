import React, { Component } from 'react';
import {Carousel, Jumbotron,Pagination} from 'react-bootstrap';
import axios from 'axios';

import SearchBar from './SearchBarComponent';
           

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {Formation: [] }
    
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
            
            <div>
            <SearchBar/>
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