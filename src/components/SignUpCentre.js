import React, { Component} from 'react';
import {  Form, FormGroup, Input, Label, Col  } from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux"; 
import { signUpCentre } from "../actions/authActions";
import classnames from "classnames";
import { withRouter } from "react-router-dom";

class SignupCentre extends Component {

    constructor(props) {
        super(props);

        this.onChangeNomCentre = this.onChangeNomCentre.bind(this);
        this.onChangeAdresseCentre = this.onChangeAdresseCentre.bind(this);
        this.onChangeTelCentre = this.onChangeTelCentre.bind(this);
        this.onChangeEmailCentre = this.onChangeEmailCentre.bind(this);
        this.onChangepasswordCentre = this.onChangepasswordCentre.bind(this);
        this.onChangeRegionCentre = this.onChangeRegionCentre.bind(this);
        this.onChangeDescriptionCentre = this.onChangeDescriptionCentre.bind(this);
        this.onChangepassword2 = this.onChangepassword2.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
           NomCentre: '',           
           AdresseCentre: '',
           TelCentre: '',
           EmailCentre: '',
           passwordCentre: '',
           RegionCentre: 'Ariana',
           DescriptionCentre: '',
           password2:'',
           Acces: 0,
           Centre: [],
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

    onChangeNomCentre(e) {
        this.setState({
            NomCentre: e.target.value
        });
    }

    onChangeAdresseCentre(e) {
        this.setState({
            AdresseCentre: e.target.value
        });
    }
    
    onChangeDescriptionCentre(e) {
        this.setState({
            DescriptionCentre: e.target.value
        });
    }
    
    onChangeTelCentre(e) {
        this.setState({
            TelCentre: e.target.value
        });
    }

    onChangeEmailCentre(e) {
        this.setState({
            EmailCentre: e.target.value
        });
    }

    onChangeRegionCentre(e) {
        this.setState({
            RegionCentre: e.target.value
        });
    }

    onChangepasswordCentre(e) {
        this.setState({
            passwordCentre: e.target.value
        });
    }
    
    onChangepassword2(e) {
        this.setState({
            password2: e.target.value
        });
    }
    
      
    
    onSubmit(e) {
        e.preventDefault();
        const Centre = {
           NomCentre: this.state.NomCentre,
           AdresseCentre : this.state.AdresseCentre,
           DescriptionCentre: this.state.DescriptionCentre,
            RegionCentre: this.state.RegionCentre,
            TelCentre: this.state.TelCentre,
            EmailCentre: this.state.EmailCentre,
            passwordCentre: this.state.passwordCentre,
            password2: this.state.password2,
            Acces: this.state.Acces
        } 
            
        this.props.signUpCentre(Centre, this.props.history);
         
        console.log(Centre);
    }

    
    render(){
        const { errors } = this.state;
        return(
    <div className="row row-content justify-content-center">
       
        <div className="col-12 col-md-9">
            <Form noValidate  onSubmit={this.onSubmit}>
                <FormGroup row>
                    <Label htmlFor="NomCentre" md={5}>Nom du Centre</Label>
                        <Col md={7}>
                       
                            <span className="red-text">{errors.NomCentre}</span>
                            <Input  type="text" id="NomCentre" name="NomCentre" required
                             placeholder="Nom du centre" value={this.state.NomCentre}
                             error={errors.NomCentre}
                             className={classnames("form-control", {invalid: errors.NomCentre})}
                             onChange={this.onChangeNomCentre} />
                        </Col>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="AdresseCentre" md={5}>Adresse</Label>
                        <Col md={7}>
                            <span className="red-text">{errors.AdresseCentre}</span>
                            <Input type="text" id="AdresseCentre" name="AdresseCentre"
                                placeholder="Adresse" required value={this.state.AdresseCentre}
                                error={errors.AdresseCentre}
                                className={classnames("form-control", {invalid: errors.AdresseCentre})}
                                onChange={this.onChangeAdresseCentre} />
                        </Col>                        
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="TelCentre" md={5}>Téléphone</Label>
                        <Col md={7}>
                            <span className="red-text">{errors.TelCentre}</span>
                            <Input type="tel" id="TelCentre" name="TelCentre"
                                placeholder="Téléphone" required value={this.state.TelCentre}
                                error={errors.TelCentre}
                                className={classnames("form-control", {invalid: errors.TelCentre})}
                                onChange={this.onChangeTelCentre} />
                        </Col>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="EmailCentre" md={5}>Email</Label>
                        <Col md={7}>
                            <span className="red-text">{errors.EmailCentre}</span>
                            <Input  required type="email" id="EmailCentre" name="EmailCentre" 
                                placeholder="Email" value={this.state.EmailCentre}
                                error={errors.EmailCentre}
                                className={classnames("form-control", {invalid: errors.EmailCentre})}
                                onChange={this.onChangeEmailCentre} />
                        </Col>
                </FormGroup>
                <FormGroup  row >
                    <Label htmlFor="RegionCentre" md={5}>Région</Label>
                    <Col md = {7}>
   
                        <Input  type="select"   value={this.state.RegionCentre} onChange={this.onChangeRegionCentre} name="RegionCentre">
                        
                        <option>Ariana</option>
                        <option>Béja</option>
                        <option>Ben Arous</option>
                        <option>Bizerte</option>
                        <option>Gabès</option>
                        <option>Gafsa</option>
                        <option>Jendouba</option>
                        <option>Kairouan</option>
                        <option>Kasserine</option>
                        <option>Kébili</option>
                        <option>Le Kef</option>
                        <option>Mahdia</option>
                        <option>La Manouba</option>
                        <option>Médenine</option>
                        <option>Monastir</option>
                        <option>Nabeul</option>
                        <option>Sfax</option>
                        <option>Sidi Bouzid</option>
                        <option>Siliana</option>
                        <option>Sousse</option>
                        <option>Tataouine</option>
                        <option>Tozeur</option>
                        <option>Tunis</option>
                        <option>Zaghouan</option>
                        
                        </Input>
                    </Col>
                </FormGroup>
                                                    
                <FormGroup row>
                    <Label htmlFor="DescriptionCentre" md={5}>Déscription</Label>
                    <Col md={7}>
                        <span className="red-text">{errors.DescriptionCentre}</span>
                        <Input   required type="textarea" id="DescriptionCentre" name="DescriptionCentre"
                            rows="6" placeholder="Déscription"
                            value={this.state.DescriptionCentre} onChange={this.onChangeDescriptionCentre}
                            error={errors.DescriptionCentre}
                            className={classnames("form-control", {invalid: errors.DescriptionCentre})}></Input>
                    </Col>              
                </FormGroup> 
                <FormGroup row>    
                    <Label htmlFor="password" md={5}>Mot de passe</Label>
                        <Col md={7}>
                            <span className="red-text">{errors.passwordCentre}</span>
                            <Input  required type="password" id="password" name="passwordCentre"
                                placeholder="Mot de passe" error={errors.passwordCentre}
                                value={this.state.passwordCentre}
                                className={classnames("form-control", {invalid: errors.passwordCentre})}
                                onChange={this.onChangepasswordCentre} />
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
                    <Col md={{size: 10, offset: 8}}>
                        <div className="form-group">
                            <input type="submit" value="Creation Demande" className="btn btn-primary" />
                        </div>
                    </Col>        
                </FormGroup>        
                            
             </Form>                    
        </div>                    
                            
    </div>                    
                    
               
    );
    

}
}

SignupCentre.propTypes = {
    signUpCentre: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

export default connect( mapStateToProps, { signUpCentre })(withRouter(SignupCentre));