import React, { Component } from 'react';
import {Form} from 'react-bootstrap';
import {FormGroup, Label,  Input, Col } from 'reactstrap';
import axios from 'axios'; 

import PropTypes from "prop-types";
import { connect } from "react-redux";

class AjoutFormateur extends Component {

    constructor(props) {
        super(props);

        this.state = {
            NomFormateur:'',
            PrenomFormateur:'',
            SpecialiteFormateur:''
        };

        this.onChangeNomFormateur = this.onChangeNomFormateur.bind(this);
        this.onChangePrenomFormateur =this.onChangePrenomFormateur.bind(this);
        this.onChangeSpecialiteFormateur = this.onChangeSpecialiteFormateur.bind(this);
 
        this.onSubmit = this.onSubmit.bind(this); 
    }


    onChangeNomFormateur(e) {
        this.setState({
            NomFormateur: e.target.value
        });
    }

    onChangePrenomFormateur(e) {
        this.setState({
            PrenomFormateur: e.target.value
        });
    }

    onChangeSpecialiteFormateur(e) {
        this.setState({
            SpecialiteFormateur: e.target.value
        });
    }

//récupération des donnees du l'Input

    onSubmit(e) {
        e.preventDefault();
        const {centre} = this.props.auth;
        const formateur = {
            NomFormateur: this.state.NomFormateur,
            PrenomFormateur: this.state.PrenomFormateur,
            SpecialiteFormateur: this.state.SpecialiteFormateur,  
            NomCentre:centre.NomCentre 
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
        
        return(
            
            <div className=" container">
                <div className=" col-12 col-md-9">
                    <Form onSubmit={this.onSubmit}>
                    <FormGroup row>
                        <Label htmlFor="NomFormateur" md={5}>Nom Formateur</Label>
                            <Col md={7}>
                                <Input type="text" id="NomFormateur" name="NomFormateur"
                                placeholder="Nom Formateur"
                                value={this.state.NomFormateur}
                                onChange={this.onChangeNomFormateur} />
                            </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label htmlFor="PrenomFormateur" md={5}>Prenom Formateur</Label>
                            <Col md={7}>
                                <Input type="text" id="PrenomFormateur" name="PrenomFormateur"
                                placeholder="Prenom Formateur"
                                value={this.state.PrenomFormateur}
                                onChange={this.onChangePrenomFormateur} />
                            </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label htmlFor="SpecialiteFormateur" md={5}>Specialite Formateur</Label>
                            <Col md={7}>
                                <Input type="text" id="SpecialiteFormateur" name="SpecialiteFormateur"
                                    placeholder="Specialite Formateur"
                                    value={this.state.SpecialiteFormateur}
                                    onChange={this.onChangeSpecialiteFormateur} />
                            </Col>                        
                    </FormGroup>

                    <FormGroup row>
                        <Col md={{size: 10, offset: 7}}>                        
                            <input type="submit" value="Creation Formateur" className="btn btn-primary" />                         
                        </Col>        
                    </FormGroup>  
                                
                    </Form>                   
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