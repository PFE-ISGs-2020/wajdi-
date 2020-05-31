import React, { Component } from 'react';
import {Carousel,Image } from 'react-bootstrap';
 
import Header from './HeaderComponent';
import HeaderClient from './Header_Client';

import Footer from './FooterComponent';
import SearchBar from '../components/SearchBarComponent';
 
import PropTypes from "prop-types";
import { connect } from "react-redux";

import PIC01 from '../img/PIC01.png';
import PIC02 from '../img/PIC02.png';
import PIC03 from '../img/PIC03.png';
import PIC04 from '../img/PIC04.png';

class Home extends Component {
    constructor(props) {
        super(props);      
        this.state = {Formation: [],
                      client:this.props.auth }
   
      }    

      render() {   
        const {client} = this.props.authClient;
        const header = (client === null) ?
          <Header /> 
        :       
          <HeaderClient />
        return (
        <div> 
        {header}

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
            <div className="row row-content">
              <div className="col-12">
                <SearchBar/>
              </div>
            </div>
            <br/>                      
          </div>  
          <Footer />  
        </div>
        );
    }
}


Home.propTypes = {
  authClient: PropTypes.object.isRequired
};  

const mapStateToProps = state => ({
  authClient: state.authClient
});

export default  connect(mapStateToProps)(Home);