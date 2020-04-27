import React, { Component} from 'react';
import {Form, FormGroup, Input, Label, Col } from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signUpClient } from "../actions/authActionsClient";
import classnames from "classnames";
import { withRouter } from "react-router-dom";

class SignUpClient extends Component {

    constructor(props) {
        super(props);

        this.onChangeNomClient = this.onChangeNomClient.bind(this);
        this.onChangePrenomClient = this.onChangePrenomClient.bind(this);
        this.onChangeDatenaissClient = this.onChangeDatenaissClient.bind(this);
        this.onChangeProfessionClient = this.onChangeProfessionClient.bind(this);
        this.onChangeNiveauClient = this.onChangeNiveauClient.bind(this);
        this.onChangeemailClient = this.onChangeemailClient.bind(this);
        this.onChangeTelClient = this.onChangeTelClient.bind(this);
        this.onChangepasswordClient = this.onChangepasswordClient.bind(this);
        this.onChangeAdresseClient = this.onChangeAdresseClient.bind(this);
        this.onChangepassword2 = this.onChangepassword2.bind(this);
        this.onSubmit = this.onSubmit.bind(this);  


        this.state = {
            NomClient: '',
            PrenomClient: '',
            DatenaissClient:'',
            ProfessionClient:'',
            NiveauClient:'Bac',
            emailClient: '',
            TelClient: '',
            password2:'',
            passwordClient: '',
            AdresseClient: ''   ,
            client: [],
            errors: {}        
        };

             
    }
      
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }
    
    onChangeNomClient(e) {
        this.setState({
            NomClient: e.target.value
        });
    }

    onChangePrenomClient(e) {
        this.setState({
            PrenomClient: e.target.value
        });
    }

    onChangeDatenaissClient(e) {
        this.setState({
            DatenaissClient: e.target.value
        });
    }

    onChangeProfessionClient(e) {
        this.setState({
            ProfessionClient: e.target.value
        });
    }

    onChangeNiveauClient(e) {
        this.setState({
            NiveauClient: e.target.value
        });
    }

    onChangeemailClient(e) {
        this.setState({
            emailClient: e.target.value
        });
    }

    onChangeTelClient(e) {
        this.setState({
            TelClient: e.target.value
        });
    }

    onChangepasswordClient(e) {
        this.setState({
            passwordClient: e.target.value
        });
    }
    onChangepassword2(e) {
        this.setState({
            password2: e.target.value
        });
    }

    onChangeAdresseClient(e) {
        this.setState({
            AdresseClient: e.target.value
        });
    }


     
    onSubmit(e) {
        e.preventDefault();
        const client = {
           NomClient: this.state.NomClient,
           PrenomClient: this.state.PrenomClient,
           DatenaissClient: this.state.DatenaissClient,
           ProfessionClient: this.state.ProfessionClient,
           NiveauClient: this.state.NiveauClient,
           emailClient:  this.state.emailClient,
           TelClient:  this.state.TelClient,
          
           passwordClient:  this.state.passwordClient,
           AdresseClient: this.state.AdresseClient ,
           password2: this.state.password2,
        }
        this.props.signUpClient(client, this.props.history);
         
        
        console.log(client);
        
    
        
    }

    render(){
        const { errors } = this.state;
        return(
           
    <div className="row row-content justify-content-center">
      
        <div className="col-12 col-md-9 ">
            <Form noValidate onSubmit={this.onSubmit} >
                <FormGroup row >
                    <Label htmlFor="NomClient" md={5}>Nom</Label>
                        <Col md={7}>
                        <span className="red-text">{errors.NomClient}</span>
                            <Input type="text" id="NomClient" name="NomClient" required
                            placeholder="Nom" 
                            value={this.state.NomClient}
                            error={errors.NomClient}
                            
                            className={classnames("form-control", {invalid: errors.NomClient})}
                            onChange={this.onChangeNomClient} />
                        </Col>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="PrenomClient" md={5}>Prenom</Label>
                        <Col md={7}>
                        <span className="red-text">{errors.PrenomClient}</span>
                            <Input type="text" id="PrenomClient" name="PrenomClient"
                            error={errors.PrenomClient} required
                            className={classnames("form-control", {invalid: errors.PrenomClient})}
                                placeholder="Prenom"
                                value={this.state.PrenomClient}
                                onChange={this.onChangePrenomClient} />
                        </Col>                        
                </FormGroup>
                
                <FormGroup row>
                    <Label htmlFor="DatenaissClient" md={5}>Date de Naissance</Label>
                        <Col md={7}>
                        <span className="red-text">{errors.DatenaissClient}</span>
                            <Input type="Date" id="DatenaissClient" name="DatenaissClient"
                                 error={errors.DatenaissClient} required
                                 className={classnames("form-control", {invalid: errors.DatenaissClient})}
                                 
                                value={this.state.DatenaissClient}
                                onChange={this.onChangeDatenaissClient} />
                        </Col>
                </FormGroup>

                <FormGroup row>
                        <Label htmlFor="ProfessionClient" md={5}>Profession</Label>
                        <Col md={7}>
                        <span className="red-text">{errors.ProfessionClient}</span>
                        <Input type="text" id="ProfessionClient" name="ProfessionClient"
                            value={this.state.ProfessionClient} required
                            error={errors.ProfessionClient}
                            className={classnames("form-control", {invalid: errors.ProfessionClient})}
                            
                            onChange={this.onChangeProfessionClient}></Input>
                        </Col>          
                    </FormGroup> 

                    <FormGroup row controlId="NiveauClient">
                        <Label htmlFor="NiveauClient" md={5}>Niveau </Label>
                        <Col md = {7}>

                            
                            <Input type="select"   value={this.state.NiveauClient} onChange={this.onChangeNiveauClient} name="NiveauClient">
                                
                         
                            
                            <option>Bac</option>
                            <option>Moin</option>
                            <option>Bac +1</option>
                            <option>Bac +2</option>
                            <option>Bac +3</option>
                            <option>Plus</option>
                                        
                            </Input>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                    <Label htmlFor="emailClient" md={5}>Email</Label>
                        <Col md={7}>
                        <span className="red-text">{errors.emailClient}</span>
                            <Input type="email" id="emailClient" name="emailClient"
                                placeholder="Email"
                                value={this.state.emailClient}
                                error={errors.emailClient} required
                            className={classnames("form-control", {invalid: errors.emailClient})}
                                onChange={this.onChangeemailClient} />
                        </Col>
                </FormGroup>

                    <FormGroup row>
                        <Label htmlFor="TelClient" md={5}>Téléphone</Label>
                            <Col md={7}>
                            <span className="red-text">{errors.TelClient}</span>
                                <Input type="tel" id="TelClient" name="TelClient"
                                    placeholder="Téléphne" required
                                    value={this.state.TelClient}
                                    error={errors.TelClient}
                            className={classnames("form-control", {invalid: errors.TelClient})}
                                    onChange={this.onChangeTelClient} />
                            </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label htmlFor="AdresseClient" md={5}>Adresse Client</Label>
                            <Col md={7}>
                            <span className="red-text">{errors.AdresseClient}</span>
                                <Input type="text" id="AdresseClient" name="AdresseClient"
                                    placeholder="Adresse Client"
                                    value={this.state.AdresseClient} required
                                    className={classnames("form-control", {invalid: errors.AdresseClient})}
                                    error={errors.AdresseClient}
                                    onChange={this.onChangeAdresseClient} />
                            </Col>
                    </FormGroup>       
                    
                    <FormGroup row>
                    <Label htmlFor="passwordClient" md={5}>Mot de passe</Label>
                        <Col md={7}>
                        <span className="red-text">{errors.passwordClient}</span>
                            <Input type="password" id="passwordClient" name="passwordClient"
                                placeholder="Mot de passe"
                                value={this.state.passwordClient} required
                                error={errors.passwordClient}
                                    className={classnames("form-control", {invalid: errors.AdresseClient})}
                                    
                                onChange={this.onChangepasswordClient} />
                        </Col>
                </FormGroup>
                <FormGroup row>    
                    <Label htmlFor="password2" md={5}> Confirmez Mot de passe</Label>
                        <Col md={7}>
                            <span className="red-text">{errors.password2}</span>
                            <Input  required type="password" id="password2" name="password2"
                                placeholder="Confirmez Mot de passe"
                                value={this.state.password2} error={errors.password2}
                                onChange={this.onChangepassword2}
                                className={classnames("form-control", {invalid: errors.password2})} />
                        </Col>
                </FormGroup>

                    <FormGroup row>
                        <Col md={{size: 10, offset: 5}}>
                        <div className="form-group">
                            <input type="submit" value="Créer un Compte" className="btn btn-primary" />
                        </div>
                        </Col>        
                    </FormGroup>        
                            
            </Form>                    
        </div>                    
                        
</div>      
               
    );
    

}
}
SignUpClient.propTypes = {
    signUpClient: PropTypes.func.isRequired,
    authClient: PropTypes.object.isRequired,
    errorsClient: PropTypes.object.isRequired
  };
const mapStateToProps = state => ({
    authClient: state.authClient,
    errors: state.errorsClient
  });
export default connect( mapStateToProps, { signUpClient })(withRouter(SignUpClient));
