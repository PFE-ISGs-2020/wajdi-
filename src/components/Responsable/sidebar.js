import React,{ Component } from "react";
import { logoutCentre } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { push  as Menu } from "react-burger-menu";

import {NavLink} from 'react-router-dom';

class SideBar extends Component {
    onLogoutClick = e => {
      e.preventDefault();
      this.props.logoutCentre();
    };
    render() {
      const { centre } = this.props.auth;
      return(
      // Pass on our props    
      <Menu  className="justify-content-center" pageWrapId={ "page-wrap" }>
              
        <div className="menu-item">
          {centre.NomCentre}
        </div>
      
      <NavLink activeClassName="myactive" to="/DashboardResponsable"  
      style={{ textDecoration: 'none' }}>
      <p>   <span className="fa fa-home fa-lg"/>   Dashboard  </p>
      </NavLink>

      <NavLink activeClassName="myactive" to="/ProfileCentre"  
      style={{ textDecoration: 'none' }}>
      <p>   <span className="fa fa-user fa-lg"/>   Profile Centre  </p>
      </NavLink>

      <NavLink activeClassName="myactive" to="/FormationList"  
      style={{ textDecoration: 'none' }}>
      <p>   <span className="fa fa-table fa-lg"/>   Liste Formations  </p>
      </NavLink>

      <NavLink activeClassName="myactive" to={"/FormateurList"}  
      style={{ textDecoration: 'none' }}>
      <p>   <span className="fa fa-table fa-lg"/>   Liste Formateurs  </p>
      </NavLink>

      <NavLink activeClassName="myactive" to="/InscriptionList"  
      style={{ textDecoration: 'none' }}>
      <p>   <span className="fa fa-table fa-lg"/>   Liste D'inscription  </p>
      </NavLink>
      <NavLink activeClassName="myactive" to="/DemandeInscriptionList"  
      style={{ textDecoration: 'none' }}>
      <p>   <span className="fa fa-table fa-lg"/>   Liste Demande D'inscription  </p>
      </NavLink>
      <a href="/" className="menu-item" onClick={this.onLogoutClick}>
      <p>   <span className="fa fa-sign-out fa-lg"/>  Logout</p>
             
      </a>
    </Menu>

    );
  }
}
SideBar.propTypes = {
    logoutCentre: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    auth: state.auth
  });

  export default connect(mapStateToProps,{ logoutCentre })(SideBar);
  


  /* 
  const StyledNav = styled(Nav)`
    background-color: #fff;

    &&[class*="expanded--"] {
        [class*="sidenav-subnav--"] {

  > [class*="sidenav-subnavitem--"][class*="selected--"] {
    > [class*="navitem--"] {
        color: #db3d44;
    }
    > [class*="navitem--"]::before {
        border-left: 2px solid #db3d44;
    }

  }
} 
`;
StyledNav.defaultProps = Nav.defaultProps;
*/