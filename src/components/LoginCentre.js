import React, { Component } from "react";
import {  Button, Form,  InputGroup, InputGroupAddon, InputGroupText, Input, Col } from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginCentre } from "../actions/authActions";
import classnames from "classnames";

class LoginCentre extends Component {
  
    constructor() {
    super();
    this.state = {
        Email: "",
        password: "",
        errors: {}
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      window.location="/dashboardResponsable"; // push responsable to dashboard when they login
    } 
if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const Centre = {
    EmailCentre: this.state.Email,
      passwordCentre: this.state.password
    };
this.props.loginCentre(Centre, this.props.history); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  
  };
  
render() {
    const { errors } = this.state;
return (
      <div className="row row-content justify-content-center">
        <div  className="col-12">
            
            <Form noValidate onSubmit={this.onSubmit}>
            <InputGroup>

                <InputGroupAddon addonType="prepend">
                    <InputGroupText ><span className="fa fa-user fa-lg"></span></InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Email"  onChange={this.onChange} value={this.state.EmailCentre}
                error={errors.EmailCentre} id="Email" type="Email"
                className={classnames("", {invalid: errors.EmailCentre || errors.emailnotfound})}/>
                <span className="red-text">{errors.EmailCentre}{errors.emailnotfound} </span>
              </InputGroup>
            <br/>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText ><span className="fa fa-lock fa-lg"></span></InputGroupText>
                </InputGroupAddon>
                <Input type="password" placeholder="Mot de passe" onChange={this.onChange} 
                 value={this.state.passwordCentre}  error={errors.passwordCentre} id="password"
                 className={classnames("", { invalid: errors.passwordCentre || errors.passwordincorrect })}/>
                <span className="red-text"> {errors.passwordCentre} {errors.passwordincorrect}</span>
            </InputGroup>            
            <br/>
            <Col md={{size: 10, offset: 9}}>
                    <Button type="submit" value="submit" color="primary">Login</Button>
            </Col> 
        </Form>  
            
        </div>
      </div>
    );
  }
}
LoginCentre.propTypes = {
  loginCentre: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, { loginCentre })(LoginCentre);
  
 


