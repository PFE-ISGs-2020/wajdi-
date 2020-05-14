import React, { Component } from 'react';
import axios from 'axios'; 
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Form} from 'react-bootstrap';
import {FormGroup, Label,  Input, Col } from 'reactstrap';
import SideBar from "./sidebar";

class AjoutFormateur extends Component {
    constructor(props) {
        super(props);
        this.state = {
            NomFormateur:'',
            PrenomFormateur:'',
            SpecialiteFormateur:'',
            NomCentre:'',
            emailFormateur: '',
            TelFormateur: ''
        };
        this.onChangeNomFormateur = this.onChangeNomFormateur.bind(this);
        this.onChangePrenomFormateur =this.onChangePrenomFormateur.bind(this);
        this.onChangeSpecialiteFormateur = this.onChangeSpecialiteFormateur.bind(this); 
        this.onChangeemailFormateur = this.onChangeemailFormateur.bind(this);
        this.onChangeTelFormateur = this.onChangeTelFormateur.bind(this);
        this.onSubmit = this.onSubmit.bind(this); 
    }

    onChangeNomFormateur(e) {
        this.setState({NomFormateur: e.target.value});
    }

    onChangePrenomFormateur(e) {
        this.setState({PrenomFormateur: e.target.value});
    }

    onChangeSpecialiteFormateur(e) {
        this.setState({SpecialiteFormateur: e.target.value});
    }

    onChangeemailFormateur(e) {
        this.setState({emailFormateur: e.target.value});
    }

    onChangeTelFormateur(e) {
        this.setState({TelFormateur: e.target.value});
    }

    //récupération des donnees du l'Input
    onSubmit(e) {
        e.preventDefault();
        const {centre} = this.props.auth;
        const formateur = {
            NomFormateur:this.state.NomFormateur,
            PrenomFormateur: this.state.PrenomFormateur,
            SpecialiteFormateur: this.state.SpecialiteFormateur,  
            NomCentre:centre.NomCentre,
            emailFormateur : this.state.emailFormateur ,
            TelFormateur : this.state.TelFormateur

            
        }      
        console.log(formateur);        
        axios.post('http://localhost:5000/Formateur/add', formateur)
        .then(res => console.log(res.data))
        .catch((error) => {
            console.log(error);
          });
        window.location = '/FormateurList';        
    }

    render(){        
        return (
            <div>
                <SideBar pageWrapId={"page-wrap"} />
                <div id="page-wrap">
                    <div className=" container ">
                        <div className="row justify-content-md-center">
                            <div className="col-10">
                                 
                                <h3 className="text-center"> Ajouter un  Formateur </h3>
                                <br/>
                                <br/>
                                <Form onSubmit={this.onSubmit}>
                                <FormGroup row>
                                    <Label htmlFor="NomFormateur" md={5}> <b>Nom:</b> </Label>
                                        <Col md={7}>
                                            <Input type="text" id="NomFormateur" name="NomFormateur"
                                            placeholder="Nom "
                                            value={this.state.NomFormateur}
                                            onChange={this.onChangeNomFormateur } />
                                        </Col>
                                </FormGroup>
    
                                <FormGroup row>
                                    <Label htmlFor="PrenomFormateur" md={5}> <b>Prénom:</b> </Label>
                                        <Col md={7}>
                                            <Input type="text" id="PrenomFormateur" name="PrenomFormateur"
                                            placeholder="Prénom "
                                            value={this.state.PrenomFormateur}
                                            onChange={this.onChangePrenomFormateur} />
                                        </Col>
                                </FormGroup>

                                <FormGroup row>
                    <Label htmlFor="emailFormateur" md={5}> <b>Email:</b></Label>
                        <Col md={7}>
                        
                            <Input type="email" id="emailFormateur" name="emailFormateur"
                                placeholder="Email"
                                value={this.state.emailFormateur} required
                                
                                className="form-control"
                                onChange={this.onChangeemailFormateur} />
                        </Col>
                </FormGroup>

                    <FormGroup row>
                        <Label htmlFor="TelFormateur" md={5}> <b>Téléphone:</b> </Label>
                            <Col md={7}>
                            
                                <Input type="tel" id="TelFormateur" name="TelFormateur"
                                    placeholder="Téléphone" required
                                    value={this.state.TelFormateur}
                                    
                                    className="form-control"
                                    onChange={this.onChangeTelFormateur} />
                            </Col>
                    </FormGroup>
    
                                <FormGroup row>
                                    <Label htmlFor="SpecialiteFormateur" md={5}><b>Spécialité:</b></Label>
                                        <Col md={7}>
                                            <Input type="text" id="SpecialiteFormateur" name="SpecialiteFormateur"
                                                placeholder="Spécialité"
                                                value={this.state.SpecialiteFormateur}
                                                onChange={this.onChangeSpecialiteFormateur} />
                                        </Col>                        
                                </FormGroup>
    
                                <FormGroup row>
                                    <Col>                        
                                        <input type="submit" value="Ajouter Formateur" className="btn btn-primary offset-3" />                         
                                        <a className="offset-1 btn btn-secondary" href="/FormateurList">
                                        Annuler
                                        </a> 
                                    </Col>        
                                </FormGroup>  
                                            
                                </Form>  
                            </div>            
                        </div>
                    </div>  
                </div>
            </div>
        );
    }
}

AjoutFormateur.propTypes = {
    auth: PropTypes.object.isRequired
  };  

  const mapStateToProps = state => ({
    auth: state.auth
  });

export default connect(mapStateToProps)(AjoutFormateur);