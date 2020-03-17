import React, { Component } from 'react';
import {  NavbarToggler, Collapse,  Button,  Modal,  ModalBody} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import {Nav,Navbar, NavbarBrand, NavItem, Tabs, Tab} from 'react-bootstrap';

import Login from './LoginCentre';
import LoginClient from './LoginClient';
import SignupCentre from './SignUpCentre';
import SignUpClient from './SignUpClient';

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
                <Navbar   expand="md">        
                    <NavbarToggler onClick={this.toggleNav} />
                    <NavbarBrand className="mr-auto" ><img src='' height="30" width="41" alt='Logo' /></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link"  to='home'><span className="fa fa-home fa-lg"/> Accueil  </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink className="nav-link"  to='home'><span className="fa fa-list fa-lg"/> Centre de formation </NavLink>
                            </NavItem>
                            
                            <NavItem>
                                <NavLink className="nav-link"  to='home'><span className="fa fa-list fa-lg"/> Formations  </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink className="nav-link" to='quisommesnous'><span className="fa fa-info fa-lg"/> Qui sommes nous? </NavLink>
                            </NavItem>
                            {/*webmaster button begin */}
                            <NavItem>
                                <NavLink className="nav-link" to='DemandeList'><span className="fa fa-info fa-lg"/> webmaster </NavLink>
                            </NavItem>
                            {/*webmaster button end */}
                            {/*responsable button begin */}
                            <NavItem>
                                <NavLink className="nav-link" to= 'ajoutformation' ><span className="fa fa-info fa-lg"/> Resposable </NavLink>
                            </NavItem>
                            {/*responsable button end */}
                            </Nav>
                            <Nav  className="ml-auto" navbar>
                                <NavItem>
                                    <Button  onClick={this.toggleModalClient}><span className="fa fa-sign-in fa-lg "/> Espace Etudiant</Button>
                                </NavItem>

                                <NavItem className="ml-2">
                                    <Button onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"/> Espace Centre</Button>
                                </NavItem>
                            </Nav> 
                           
                            
                        </Collapse> 
                                        
                </Navbar> 
            {/*modal centre begin */}
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
         {/*modal centre end */}
         {/*modal client begin */}
         <Modal isOpen={this.state.isModalClientOpen} toggle={this.toggleModalClient}>
   
            <ModalBody> 
                <Tabs id="controlled-tab" >
                <Tab  title="Log In Client" eventKey="LoginClient"> 
                <div className="col-12">
                    
                    <h3>Log In</h3>
                    <br/>
                </div>
                <LoginClient/>
                </Tab>
                <Tab  title="Sign Up Client" eventKey="SignUpClient" >
                <div className="col-12">
                
                <h3>Sign Up</h3>
                </div>
                <SignUpClient/>
                </Tab>
                </Tabs>
            </ModalBody>

         </Modal> 
         {/*modal client end */}                                  
         </div>
            
        );
    }
}


export default Header;