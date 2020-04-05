import React,{ Component } from "react";
import { logoutCentre } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { push  as Menu } from "react-burger-menu";



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
      
        <a className="menu-item">
          {centre.NomCentre}
        </a>

      <a className="menu-item" href="/DashboardResponsable"  style={{ textDecoration: 'none' }}>
      <p>   <span className="fa fa-user fa-lg"/>   Profile Centre  </p>
      </a>

      <a className="menu-item" href="/FormationList"  style={{ textDecoration: 'none' }}>
      <p>   <span className="fa fa-table fa-lg"/>   Liste Formations  </p>
      </a>

      <a className="menu-item" href={"/FormateurList"}  style={{ textDecoration: 'none' }}>
      <p>   <span className="fa fa-table fa-lg"/>   Liste Formateurs  </p>
      </a>

      <a className="menu-item" href="/InscriptionList"   style={{ textDecoration: 'none' }}>
      <p>   <span className="fa fa-table fa-lg"/>   Liste Demande D'inscription  </p>
      </a>

      <a className="menu-item" onClick={this.onLogoutClick}>
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
  