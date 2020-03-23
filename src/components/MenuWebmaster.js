import React, { Component } from 'react';
import {  NavbarToggler, Collapse,  Button} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import {Nav,Navbar, NavbarBrand, NavItem, NavDropdown} from 'react-bootstrap';

class HeaderWebmaster extends Component {
    constructor(props) {
        super(props);
    
        
        this.state = {
          isNavOpen: false,
        };
        this.toggleNav = this.toggleNav.bind(this);
                       
      }

      toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
        this.toggleNav=this.toggleNav.bind(this);
      }
        
    render() {

        return(
            <div className="nav-head ">
                                                  
         </div>
            
        );
    }
}


export default HeaderWebmaster;