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
                <Navbar  dark expand="md">        
                    <NavbarToggler onClick={this.toggleNav} />
                    <NavbarBrand className="mr-auto" href=""><img src='' height="30" width="41" alt='Logo' /></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link"  to='home'><span className="fa fa-home fa-lg"/> Accueil </NavLink>
                            </NavItem>

                            <NavDropdown  title={<a><span className="fa fa-list fa-lg"/> Centre de formation</a>} id="nav-dropdown-centre_de_formations">
                                <NavDropdown.Item eventKey="4.1">Yoodev</NavDropdown.Item>
                                <NavDropdown.Item eventKey="4.2">ISG</NavDropdown.Item>
                                
                            </NavDropdown>
                            
                            <NavDropdown title={<a><span className="fa fa-list fa-lg"/> Formations </a>} id="nav-dropdown-formations">
                                <NavDropdown.Item eventKey="4.1">BTP</NavDropdown.Item>
                                <NavDropdown.Item eventKey="4.2">BTS</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item eventKey="4.4">A court terme</NavDropdown.Item>
                            </NavDropdown>
                            

                            <NavItem>
                                <NavLink className="nav-link" to='ResponsablesList'> Requests </NavLink>
                            </NavItem>
                            
                            </Nav>
                            <Nav  className="ml-auto" navbar>
                                <NavItem>
                                    <Button outline onClick={this.toggleModal}><span className="fa fa-sign-out fa-lg"></span>Log out</Button>
                                </NavItem>
                            </Nav> 
                           
                            
                        </Collapse> 
                                        
                </Navbar>                                   
         </div>
            
        );
    }
}


export default HeaderWebmaster;