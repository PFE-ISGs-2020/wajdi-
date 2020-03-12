import React, { Component} from 'react';
import {  Form, FormGroup, Input, Label, Col  } from 'reactstrap';
import axios from 'axios'; 


class SignupCentre extends Component {

    constructor(props) {
        super(props);

        this.onChangeNomCentre = this.onChangeNomCentre.bind(this);
        this.onChangeAdresse = this.onChangeAdresse.bind(this);
        this.onChangeTel = this.onChangeTel.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeRegion = this.onChangeRegion.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
           NomCentre: '',
           password: '',
           Adresse: '',
           Tel: '',
            Email: '',
            Region: '',
            Description: '',
           
            Demande: []
        };

    }

    onChangeNomCentre(e) {
        this.setState({
            NomCentre: e.target.value
        });
    }

    onChangeAdresse(e) {
        this.setState({
            Adresse: e.target.value
        });
    }
    
    onChangeDescription(e) {
        this.setState({
          Description: e.target.value
        });
    }
    
    onChangeTel(e) {
        this.setState({
            Tel: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            Email: e.target.value
        });
    }

    onChangeRegion(e) {
        this.setState({
            Region: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    
      
    
    onSubmit(e) {
        e.preventDefault();
        const demande = {
           NomCentre: this.state.NomCentre,
           Adresse : this.state.Adresse,
            Description: this.state.Description,
            Region: this.state.Region,
            Tel: this.state.Tel,
            Email: this.state.Email,
            password: this.state.password
        }
      
        console.log(demande);
       //Query pour ajouter une nouvelle demande
        axios.post('http://localhost:5000/demande/add', demande)
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
                    <Label htmlFor="Adresse" md={5}>Adresse</Label>
                        <Col md={7}>
                            <Input className="form-control" type="text" id="Adresse" name="Adresse"
                                placeholder="Adresse" required
                                value={this.state.Adresse}
                                onChange={this.onChangeAdresse} />
                        </Col>                        
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="Tel" md={5}>Téléphone</Label>
                        <Col md={7}>
                            <Input  className="form-control" type="tel" id="Tel" name="Tel"
                                placeholder="Téléphne" required
                                value={this.state.Tel}
                                onChange={this.onChangeTel} />
                        </Col>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="Email" md={5}>Email</Label>
                        <Col md={7}>
                            <Input className="form-control"  required type="email" id="Email" name="Email"
                                placeholder="Email"
                                value={this.state.Email}
                                onChange={this.onChangeEmail} />
                        </Col>
                </FormGroup>
                <FormGroup  row controlId="Region">
                    <Label htmlFor="Region" md={5}>Région</Label>
                    <Col md = {7}>
   
                        <Input className="form-control"  required type="select"   value={this.state.Region} onChange={this.onChangeRegion} name="Region">
                        
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
                    <Label htmlFor="Description" md={5}>Description</Label>
                    <Col md={7}>
                        <Input className="form-control"  required type="textarea" id="Description" name="Description"
                            rows="6" placeholder="Déscription"
                            value={this.state.Description}
                            onChange={this.onChangeDescription}></Input>
                    </Col>              
                </FormGroup> 
                <FormGroup row>    
                    <Label htmlFor="password" md={5}>Mot de passe</Label>
                        <Col md={7}>
                            <Input className="form-control"  required type="password" id="password" name="password"
                                placeholder="Mot de passe"
                                value={this.state.password}
                                onChange={this.onChangePassword} />
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