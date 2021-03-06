import React, { Component } from 'react';
import {  NavbarToggler, Collapse,  Button,  Modal,  ModalBody} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import {Nav,Navbar, NavItem, Tabs, Tab, Image} from 'react-bootstrap';

import Login from './LoginCentre';
import LoginClient from './LoginClient';
import SignupCentre from './SignUpCentre';
import SignUpClient from './SignUpClient';
import ModalHeader from 'react-bootstrap/ModalHeader';
import TunFormation from "../img/TunFormation.png"

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
                <Navbar   expand="md" variant="dark">        
                    <NavbarToggler onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav className="navbar">
                            <NavItem>
                                <NavLink className="nav-link"  to='/'> <Image src={TunFormation} style={{backgroundColor:"white"}} height="39px" width="40px" roundedCircle/> <span className="fas fa-home fa-lg"/> Accueil  </NavLink>
                            </NavItem>
                            
                            <NavItem>
                                <NavLink className="nav-link"  to='/CentresFormation'><span className="fas fa-university fa-lg"/> Centres de formation </NavLink>
                            </NavItem>
                            
                            <NavItem>
                                <NavLink className="nav-link"  to='/Formations'><span className="fas fa-graduation-cap fa-lg"/> Formations  </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink className="nav-link" to='/QuiSommesNous'><span className="fas fa-info fa-lg"/> Qui sommes nous? </NavLink>
                            </NavItem>
                    
                            </Nav>

                            <Nav  className="ml-auto navbar" >
                                <NavItem >
                                    <Button style={{backgroundColor: '#FCCA92',color:"#0A3642",fontWeight:"bold",border:"none"}}  onClick={this.toggleModalClient}><span className="fas fa-sign-in-alt fa-lg "/> Espace Client</Button>
                                </NavItem>

                                <NavItem className="m-2">
                                    <Button  style={{backgroundColor: '#FCCA92',color:"#0A3642",fontWeight:"bold",border:"none"}} onClick={this.toggleModal}><span className="fas fa-sign-in-alt fa-lg"/> Espace Centre</Button>
                                </NavItem>
                            </Nav> 
                           
                            
                        </Collapse> 
                                        
                </Navbar> 
                
            {/*modal centre begin */}
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader>

                    <h3>Espace Centre </h3>
                    <Button className="close" onClick={ () => { this.toggleModal()}}>
                          &times;
                    </Button>

                </ModalHeader>
                <ModalBody>
                    
                    
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
            <ModalHeader>
                <h3>Espace Client</h3>
                <Button className="close" onClick={ () => { this.toggleModalClient()}}>
                          &times;
                </Button> 
            </ModalHeader>
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