import React, { Component } from 'react';
import {  NavbarToggler, Collapse} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import {Nav,Navbar, NavItem,Image,Dropdown} from 'react-bootstrap';
import { logoutClient } from "../actions/authActionsClient";
import PropTypes from "prop-types";
import { connect } from "react-redux";
 
import wajdi from '../img/wajdi.jpg';
class HeaderClient extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
          isNavOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);                       
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
        const {client} = this.props.authClient;
        const NomClient = client.NomClient.toUpperCase();
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
                                <NavLink className="nav-link"  to='/CentreFormation'><span className="fa fa-list fa-lg"/> Centre de formation </NavLink>
                            </NavItem>
                            
                            <NavItem>
                                <NavLink className="nav-link"  to='/Formation'><span className="fa fa-list fa-lg"/> Formations  </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink className="nav-link" to='/quisommesnous'><span className="fa fa-info fa-lg"/> Qui sommes nous? </NavLink>
                            </NavItem>
                            </Nav>

                            <Nav  className="ml-auto navbar" >                            
                               
                               <NavItem>
                                    <Dropdown size="sm"   drop={'left'}>
                                        <Dropdown.Toggle style={{backgroundColor:"#0A3642",border:"none"}} > 
                                            <Image src={wajdi} style={{backgroundColor:"white"}} height="40px" width="40px" roundedCircle />                                         
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                        <Dropdown.Item href="/profileClient">
                                            {NomClient}
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/" onClick={this.onLogoutClick}>
                                           Logout
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