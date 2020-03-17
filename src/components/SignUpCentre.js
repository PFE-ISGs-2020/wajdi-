import React, { Component} from 'react';
import {  Form, FormGroup, Input, Label, Col  } from 'reactstrap';
import axios from 'axios'; 


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
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
           NomCentre: '',           
           AdresseCentre: '',
           TelCentre: '',
           EmailCentre: '',
           passwordCentre: '',
           RegionCentre: '',
           DescriptionCentre: '',
           Acces: 0,
           Demande: []
        };

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
            Acces: this.state.Acces
        }
      
        console.log(Centre);
       //Query pour ajouter un nouvau Centre
        axios.post('http://localhost:5000/Centre/add', Centre)
        .then(res => console.log(res.data));
       //Retourner au home page aprés l'ajout
        window.location = '/home';
    }

    
    render(){
        return(
    <div className="row row-content">
       
        <div className="col-12 col-md-9">
            <Form onSubmit={this.onSubmit}>
                <FormGroup row>
                    <Label htmlFor="NomCentre" md={5}>Nom du Centre</Label>
                        <Col md={7}>
                       
                            <Input className="form-control" type="text" id="NomCentre" name="NomCentre" required
                             placeholder="Nom du centre"
                             value={this.state.NomCentre}
                             onChange={this.onChangeNomCentre} />
                        </Col>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="AdresseCentre" md={5}>Adresse</Label>
                        <Col md={7}>
                            <Input className="form-control" type="text" id="AdresseCentre" name="AdresseCentre"
                                placeholder="Adresse" required
                                value={this.state.AdresseCentre}
                                onChange={this.onChangeAdresseCentre} />
                        </Col>                        
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="TelCentre" md={5}>Téléphone</Label>
                        <Col md={7}>
                            <Input  className="form-control" type="tel" id="TelCentre" name="TelCentre"
                                placeholder="Téléphne" required
                                value={this.state.TelCentre}
                                onChange={this.onChangeTelCentre} />
                        </Col>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="EmailCentre" md={5}>Email</Label>
                        <Col md={7}>
                            <Input className="form-control"  required type="email" id="EmailCentre" name="EmailCentre"
                                placeholder="Email"
                                value={this.state.EmailCentre}
                                onChange={this.onChangeEmailCentre} />
                        </Col>
                </FormGroup>
                <FormGroup  row controlId="RegionCentre">
                    <Label htmlFor="RegionCentre" md={5}>Région</Label>
                    <Col md = {7}>
   
                        <Input className="form-control"  required type="select"   value={this.state.RegionCentre} onChange={this.onChangeRegionCentre} name="RegionCentre">
                        
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
                    <Label htmlFor="DescriptionCentre" md={5}>Description</Label>
                    <Col md={7}>
                        <Input className="form-control"  required type="textarea" id="DescriptionCentre" name="DescriptionCentre"
                            rows="6" placeholder="Déscription"
                            value={this.state.DescriptionCentre}
                            onChange={this.onChangeDescriptionCentre}></Input>
                    </Col>              
                </FormGroup> 
                <FormGroup row>    
                    <Label htmlFor="password" md={5}>Mot de passe</Label>
                        <Col md={7}>
                            <Input className="form-control"  required type="password" id="passwordCentre" name="passwordCentre"
                                placeholder="Mot de passe"
                                value={this.state.passwordCentre}
                                onChange={this.onChangepasswordCentre} />
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
export default SignupCentre;