import React, { Component } from 'react';
import {  NavbarToggler, Collapse,  Button,  Modal,  ModalBody } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import {Nav,Navbar, NavbarBrand, NavItem, NavDropdown, Tabs, Tab} from 'react-bootstrap';
import SignupCentre from './SignUpCentre';
import Login from './LoginCentre';
import LoginClient from './LoginClient';

class Header extends Component {
    constructor(props) {
        super(props);
    
        
        this.state = {
          isNavOpen: false,
          isModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleModalClient = this.toggleModalClient.bind(this);
                       
      }

      toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
        this.toggleNav=this.toggleNav.bind(this);
      }
      toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
        this.toggleModal = this.toggleModal.bind(this);
      }
      toggleModalClient() {
        this.setState({
          isModalClientOpen: !this.state.isModalClientOpen
        });
        this.toggleModalClient = this.toggleModalClient.bind(this);
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
                                <NavLink className="nav-link" to=''><span className="fa fa-info fa-lg"/> Qui sommes nous? </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink className="nav-link" to='ResponsablesList'><span className="fa fa-info fa-lg"/> webmaster </NavLink>
                            </NavItem>
                            
                            </Nav>
                            <Nav  className="ml-auto" navbar>
                                <NavItem>
                                    <Button outline onClick={this.toggleModalClient}><span className="fa fa-sign-in fa-lg"/> Log in</Button>
                                </NavItem>
                                <NavItem>
                                    <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span>Espace Centre</Button>
                                </NavItem>
                            </Nav> 
                           
                            
                        </Collapse> 
                                        
                </Navbar> 

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
               
                
            <ModalBody>
                <h3>Espace Centre </h3>
                
            <Tabs id="controlled-tab" >
            <Tab  title="Log In" eventKey="Login"> 
            <div className="col-12">
                
                <h3>Log In</h3>
                <br/>
            </div>
            <Login/>
            </Tab>
            <Tab  title="Sign Up" eventKey="Signup" >
            <div className="col-12">
            
             <h3>Sign Up</h3>
        </div>
            <SignupCentre/>
            </Tab>
      
      
      
    </Tabs>
                
            </ModalBody>
         </Modal> 
         <Modal isOpen={this.state.isModalClientOpen} toggle={this.toggleModalClient}>
   
            <ModalBody>
                <LoginClient/>
                
            </ModalBody>
         </Modal>                                   
         </div>
            
        );
    }
}


export default Header;