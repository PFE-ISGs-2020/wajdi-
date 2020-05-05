import React, { Component } from 'react';
import {Carousel,Image } from 'react-bootstrap';
 
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import SearchBar from '../components/SearchBarComponent';
 
import PIC01 from '../img/PIC01.png';
import PIC02 from '../img/PIC02.png';
import PIC03 from '../img/PIC03.png';
import PIC04 from '../img/PIC04.png';

class Home extends Component {
    constructor(props) {
        super(props);      
        this.state = {Formation: [] }
   
      }


      render() { 
        return (
        <div> 
        <Header />
        <div className="container">         
          <br/>
          {/* Carousel slider */}           
            <div className="row row-content">
              <div className="col-12">
                <Carousel className="carouselslide rounded">
                  <Carousel.Item>
                    <Image 
                      className=" mx-auto d-block"
                      src={PIC01}
                      alt="Third slide"
                    />
                  </Carousel.Item>

                  <Carousel.Item>
                    <Image 
                      className="mx-auto d-block"
                      src={PIC02}
                      alt="Third slide"
                    />
                  
                  </Carousel.Item>

                  <Carousel.Item>
                    <Image 
                      className="mx-auto d-block "
                      src={PIC03}
                      alt="Forth slide"
                    />

                  </Carousel.Item>

                  <Carousel.Item>
                    <Image 
                      className="mx-auto d-block  "
                      src={PIC04}
                      alt="Fifth slide"
                    />
               
                  </Carousel.Item>

                </Carousel> 
                    
              </div>
            </div>
            <br/>
            <div>
            <SearchBar/>
            </div>
            <br/>                      
          </div>  
          <Footer />  
        </div>
        );
    }
}

export default Home;