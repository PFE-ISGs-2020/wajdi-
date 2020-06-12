import React, { Component } from 'react';
import {  Button, Form,  InputGroup, InputGroupAddon, InputGroupText, Input, Col } from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginClient} from "../actions/authActionsClient";
import classnames from "classnames";

class LoginClient extends Component {

    constructor() {
        super();
        this.state = {
            emailClt: "",
            passwordClt: "",
            errors: {}
        };
      }

    
      UNSAFE_componentWillReceiveProps(nextProps) {
    /* if (nextProps.authClient.isAuthenticated) {
      window.location="/profileClient"; // push responsable to dashboard when they login
    }  */
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
    const Client = {
        emailClient: this.state.emailClt,
        passwordClient: this.state.passwordClt
        };
    this.props.loginClient(Client, this.props.history); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
      
      };

    render(){
        const { errors } = this.state;
    return(
        <div className="row row-content justify-content-center">
        
            <div className="col-12 col-md-9">
            <Form noValidate onSubmit={this.onSubmit}>
                        
                <InputGroup>

                    <InputGroupAddon addonType="prepend">
                        <InputGroupText ><span className="fa fa-user fa-lg"></span></InputGroupText>
                    </InputGroupAddon>
                    <Input type="Email" placeholder="Email" onChange={this.onChange} value={this.state.emailClient}
                           error={errors.emailClient} id="emailClt"
                           className={classnames("", {invalid: errors.emailClient || errors.emailnotfound})}/>
                </InputGroup> 
                <span style={ {color:'red'} }> {errors.emailClient}{errors.emailnotfound} <br/> </span>           
               
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText ><span className="fa fa-lock fa-lg"></span></InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" placeholder="Mot de passe" onChange={this.onChange}
                    value={this.state.passwordClient}  error={errors.passwordClient} id="passwordClt"
                    className={classnames("", { invalid: errors.passwordClient || errors.passwordincorrect })}/>
                </InputGroup>
                <span style={ {color:'red'} }> {errors.passwordClient} {errors.passwordincorrect} <br/> </span>
                
                <Col md={{size: 10, offset: 9}}>
                    <Button type="submit" value="submit" color="primary">Login</Button>
                </Col>    
            </Form>

            </div>
        </div>
    );
    }
}

LoginClient.propTypes = {
    loginClient: PropTypes.func.isRequired,
    authClient: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    authClient: state.authClient,
    errors: state.errors
  });
export default connect(mapStateToProps, { loginClient })(LoginClient);