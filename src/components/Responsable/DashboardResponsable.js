import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutCentre } from "../../actions/authActions";
import SideBar from "./sidebar";
import './Sidebar.css';

class DashboardResponsable extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutCentre();
  };
 
render() {
    const { centre } = this.props.auth;
return (
      <div>
        <SideBar pageWrapId={"page-wrap"} />
        
        <div id="page-wrap" className="container">
          <h4>
            <b>Hey there,</b> {centre.NomCentre}
            <p className="flow-text grey-text text-darken-1">
              You are logged into your Dashboard
              <span style={{ fontFamily: "monospace" }}></span> 👏
            </p>
          </h4>              
        </div>
      </div>
    );
  }
}
  DashboardResponsable.propTypes = {
    logoutCentre: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });

export default connect(mapStateToProps,{ logoutCentre })(DashboardResponsable);