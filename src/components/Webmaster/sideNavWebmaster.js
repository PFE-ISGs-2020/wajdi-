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

                <NavLink activeClassName="myactive" to='/DashboardWebmaster'
                style={{ textDecoration: 'none' }}> Dashboard </NavLink>
               
                <NavLink activeClassName="myactive" to='/VerifierEtatCentre'
                style={{ textDecoration: 'none' }}> Consulter liste des comptes activée </NavLink>
                
                <NavLink activeClassName="myactive" to='/DemandeList' 
                style={{ textDecoration: 'none' }}> Demandes des responsables </NavLink>
                
                <NavLink activeClassName="myactive" to='/ThemeList'
                style={{ textDecoration: 'none' }}> Consulter la liste des thèmes </NavLink>
                <hr style={{backgroundColor:"#fff"}} />
                  <a href="/loginwebmaster" className="menu-item" onClick={this.onLogoutClick}>
        
<<<<<<< HEAD
                    <p >   <span className="fas fa-sign-out-alt fa-lg"/>  Logout</p>
=======
                    <p >   <span className="fas fa-sign-in-alt fa-lg "/>  Logout</p>
>>>>>>> 90b5c616532a5dcb2e0f62fade57e6559c84a1de
          
                  </a>
            </Menu>
  );
  }
}
  export default SideNavWebmaster;