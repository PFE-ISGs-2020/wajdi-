import React, { Component } from 'react';
import {  Form, FormGroup, Input, Label, Col  } from 'reactstrap';
import axios from 'axios';
import SideBar from "./sidebar";
import PropTypes from "prop-types";
import { connect } from "react-redux";



class ModifierPasswordCentre extends Component {
  constructor(props) {
    super(props);

    this.state = {
        //centre: this.props.auth,
        OldPassword:'',
        NewPassword:'',
        ConfirmNewPassword:'',
        password: '',
        formErrors: {NewPassword: '', ConfirmNewPassword: ''},
        passwordValid: false,
        formValid: false

    };
    

    this.onChangeOldPassword = this.onChangeOldPassword.bind(this);
    this.onChangeNewPassword =this.onChangeNewPassword.bind(this);
    this.onChangeConfirmNewPassword = this.onChangeConfirmNewPassword.bind(this);
   
    this.onSubmit = this.onSubmit.bind(this); 
  }

  
   //didmount begin
  componentDidMount() {
    const { centre } = this.props.auth;
    axios.get('http://localhost:5000/Centre/'+centre.id)
      .then(response => {
        this.setState({
            password: response.data.passwordCentre,            
            
        })
          
      })
      .catch((error) => {
        console.log(error);
      })

    }
    //didmount end

    onChangeOldPassword(e) {
        this.setState({
            OldPassword: e.target.value
        });
    }

    onChangeNewPassword(e) {
        this.setState({
            NewPassword: e.target.value
        });
    }

    onChangeConfirmNewPassword(e) {
        this.setState({
            ConfirmNewPassword: e.target.value
        });
    }

    //récupération des donnees du l'Input
    onSubmit(e) {
    e.preventDefault();
    const { centre } = this.props.auth;
    const { NewPassword, ConfirmNewPassword } = this.state;
    const bcrypt = require("bcryptjs");
    // perform all neccassary validations
    if (NewPassword !== ConfirmNewPassword) {
        alert("Passwords don't match");
    }
    else{  
     // Check password
     (bcrypt.compare(this.state.OldPassword, this.state.password))
         .then(isMatch => {
            if (isMatch) {
                const centr = {
                   
                    passwordCentre: this.state.NewPassword,
                    
                }
                
                console.log(centr);
                
                  axios.post('http://localhost:5000/Centre/updatePassword/' + centre.id, centr)
                  .then(res => console.log(res.data),
                  window.location = '/DashboardResponsable',
                  alert("password updated "));  
              }  
              else {alert("Old Password is incorrect ");}
          
        
    } )}
    
}

  render() {
    
    return (
        <div>
            <SideBar pageWrapId={"page-wrap"} />
            <div id="page-wrap">
                <div className=" container ">
                    <div className="row justify-content-md-center">
                        <section className="col-10 text-center">
                            <br/>
                            <h3> Changer Mot de Passe </h3>
                            <br/>
                            <br/>
                            <Form onSubmit={this.onSubmit}>

                            <FormGroup row>    
                    <Label htmlFor="OldPassword" md={5}> <b>Ancien Mot de Passe </b></Label>
                        <Col md={7}>
                           {/* // <span className="red-text">{errors.passwordCentre}</span> */}
                            <Input  required type="password" id="OldPassword" name="OldPassword"
                                placeholder="Ancien Mot de Passe" 
                                //error={errors.passwordCentre}
                                value={this.state.OldPassword}
                                className="form-control"
                                // className={classnames("form-control", {invalid: errors.passwordCentre})}
                                onChange={this.onChangeOldPassword} />
                        </Col>
                </FormGroup>
                <FormGroup row>    
                    <Label htmlFor="NewPassword" md={5}> <b> Nouveau Mot de Passe </b></Label>
                        <Col md={7}>
                            {/* <span className="red-text">{errors.password2}</span> */}
                            <Input  required type="password" id="NewPassword" name="NewPassword"
                                placeholder="Nouveau Mot de Passe"
                                value={this.state.NewPassword} 
                                //error={errors.NewPassword}
                                onChange={this.onChangeNewPassword}
                                className = "form-control"
                                //className={classnames("form-control", {invalid: errors.password2})} 
                                />
                        </Col>
                </FormGroup>

                <FormGroup row>    
                    <Label htmlFor="ConfirmNewPassword" md={5}> <b>Confirmer Mot de passe</b></Label>
                        <Col md={7}>
                            {/* <span className="red-text">{errors.password2}</span> */}
                            <Input  required type="password" id="ConfirmNewPassword" name="ConfirmNewPassword"
                                placeholder="Confirmer Mot de passe"
                                value={this.state.ConfirmNewPassword} 
                                // error={errors.password2}
                                onChange={this.onChangeConfirmNewPassword}
                                className= "form-control"
                               // className={classnames("form-control", {invalid: errors.ConfirmNewPassword})} 
                               />
                        </Col>
                </FormGroup>

                            <FormGroup row>
                                <Col>  
                                <br/>                      
                                    <input type="submit" value="Modifer" className="btn btn-primary offset-2" />                         
                                    <a className="offset-1 btn btn-secondary" href="/DashboardResponsable">
                                        Annuler
                                    </a>
                                </Col>        
                            </FormGroup>  
                                        
                            </Form>  
                        </section>            
                    </div>
                </div>  
            </div>
        </div>
    );
  }
}
ModifierPasswordCentre.propTypes = {
    // logoutCentre: PropTypes.func.isRequired,
     auth: PropTypes.object.isRequired
   };
   
   const mapStateToProps = state => ({
     auth: state.auth
   });
 export default connect(mapStateToProps)(ModifierPasswordCentre);