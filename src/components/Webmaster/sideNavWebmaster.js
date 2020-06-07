import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { push  as Menu } from "react-burger-menu";

class SideNavWebmaster extends Component {
    render(){
        return(
            <Menu  className="justify-content-center" pageWrapId={ "page-wrap" }>
                <span className="menu-item"  style={{fontSize:"20px",fontFamily:"Verdana",textAlign:"center"}}>
                  Webmaster <hr style={{backgroundColor:"#fff"}} />
                </span>

                <NavLink activeClassName="myactive" to='/verif'
                style={{ textDecoration: 'none' }}> Vérifier Etat centre </NavLink>
                
                <NavLink activeClassName="myactive" to='/DemandeList' 
                style={{ textDecoration: 'none' }}> Demandes des responsables </NavLink>
                
                <NavLink activeClassName="myactive" to='/consulte'
                style={{ textDecoration: 'none' }}>Consulter les avis </NavLink>
               
                <NavLink activeClassName="myactive" to='/droit'
                style={{ textDecoration: 'none' }}> Donner les droits de publication </NavLink>

                <NavLink activeClassName="myactive" to='/ThemeList'
                style={{ textDecoration: 'none' }}> Consulter la liste des thèmes </NavLink>
                
            </Menu>
  );
  }
}
  export default SideNavWebmaster;