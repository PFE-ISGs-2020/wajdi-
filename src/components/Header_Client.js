import React, { Component } from 'react';
import {  NavbarToggler, Collapse} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import {Nav,Navbar, NavItem,Image,Dropdown} from 'react-bootstrap';
import { logoutClient } from "../actions/authActionsClient";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import DefaultImg from '../assets/default-img.jpg'; 

class HeaderClient extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
          isNavOpen: false, 
          Client: []
        };
        this.toggleNav = this.toggleNav.bind(this);                       
      }

      componentDidMount(){
        const {client} = this.props.authClient;
        axios.get('http://localhost:5000/Client/'+client.id)
        .then(clt => {
          this.setState({ Client: clt.data })
        })
        .catch((error) => {
          console.log(error);
        })
      }

      toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
        this.toggleNav=this.toggleNav.bind(this);
      }

      onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutClient();
      };

    render() {
      
      let image = DefaultImg;
      if (this.state.Client.imageClient){
      image = "http://localhost:5000/"+this.state.Client.imageClient;}
  
        return(
            <div className="nav-head ">
                <Navbar   expand="md" variant="dark">        
                    <NavbarToggler onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav className="navbar">
                            <NavItem>
                                <NavLink className="nav-link"  to='/'><span className="fa fa-home fa-lg"/> Accueil  </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink className="nav-link"  to='/CentresFormation'><span className="fas fa-university fa-lg"/> Centres de formation </NavLink>
                            </NavItem>
                            
                            <NavItem>
                                <NavLink className="nav-link"  to='/Formations'><span className="fa fa-graduation-cap fa-lg"/> Formations  </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink className="nav-link" to='/QuiSommesNous'><span className="fa fa-info fa-lg"/> Qui sommes nous? </NavLink>
                            </NavItem>
                            </Nav>

                            <Nav  className="ml-auto navbar" >    
                               <NavItem>
                                    <Dropdown size="sm" drop={'left'}>
                                        <Dropdown.Toggle   style={{backgroundColor:"#0A3642",border:"none"}}  > 
                                              <Image src={image} style={{backgroundColor:"white"}} height="43px" width="40px" roundedCircle />                                       
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                        <p className= "text-center"> {this.state.Client.PrenomClient + " " + this.state.Client.NomClient}</p>
                                        <hr/>
                                        <Dropdown.Item href="/profileClient">
                                        <span className="fa fa-user "/>  Profile
                                        </Dropdown.Item>

                                        <Dropdown.Item href="/MesAchats" >
                                        <span className="fa fa-shopping-cart"></span>  Mes Formations
                                        </Dropdown.Item>
                                        
                                        <Dropdown.Item href={"/MesDemandes/" + this.state.Client._id } >
                                        <span className="fa fa-share"></span>  Mes Demandes d'inscription
                                        
                                        </Dropdown.Item>
                                        
                                        <Dropdown.Item href={"/ModifierPasswordClient/" + this.state.Client._id } >
                                        <span className="fa fa-cog"></span>  Changer Mot de passe
                                        
                                        </Dropdown.Item>

                                        <Dropdown.Divider />
                                        
                                        <Dropdown.Item href="/" onClick={this.onLogoutClick}>
                                        <span className="fas fa-sign-out-alt"></span>  Logout
                                        </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                              </NavItem>
                            </Nav> 
                            
                        </Collapse> 
                                        
                </Navbar>                              
         </div>
            
        );
    }
}

HeaderClient.propTypes = {
    logoutClient: PropTypes.func.isRequired,
      authClient: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    authClient: state.authClient
  });
  export default connect(mapStateToProps,{ logoutClient })(HeaderClient);     