import React, { Component } from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class Menu extends Component {
    render(){
        return(
            <Nav  className="flex-column  " >
            <NavItem>
                <NavLink className="nav-link" to=''> Vérifier Etat centre </NavLink>
            </NavItem>

            <NavItem>
                <NavLink className="nav-link" to='DemandeList'> Demandes des responsables </NavLink>
            </NavItem>
            <NavItem>
            <NavLink className="nav-link" to=''>Consulter les avis </NavLink>
                </NavItem>

            <NavItem>
                <NavLink className="nav-link" to=''> Donner les droits de publication </NavLink>
            </NavItem>
          </Nav>
  );
  }}
  export default Menu