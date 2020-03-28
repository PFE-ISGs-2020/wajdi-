import React, { Component } from 'react';
import {Carousel, Jumbotron,Pagination,Image } from 'react-bootstrap';
import axios from 'axios';


import SearchBar from './SearchBarComponent';
import slide from '../img/slide.jpg';
import BLUE from '../img/BLUE.png';
import RED from '../img/RED.png';
class Home extends Component {
    constructor(props) {
        super(props);      
        this.state = {Formation: [] 
   }
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
          <Jumbotron>
            <div className="row row-content">
              <div class="col-12">
                <Carousel className="carousel slide">
                  <Carousel.Item className="active">
                    <Image className="d-block w-100"
                      src={slide} 
                      />
                    <Carousel.Caption>
                      <h3>First slide </h3>
                      <p>slide</p>
                    </Carousel.Caption>
                  </Carousel.Item>

                  <Carousel.Item>
                    <Image 
                      className="d-block w-100"
                      src={BLUE}
                      alt="Third slide"
                    />
                    <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                  </Carousel.Item>

                  <Carousel.Item>
                    <Image 
                      className="d-block w-100"
                      src={RED}
                      alt="Third slide"
                    />
                    <Carousel.Caption>
                      <h3>Third slide label</h3>
                      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel> 
                    
              </div>
            </div>
            </Jumbotron>  
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