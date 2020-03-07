import React, { Component} from 'react';
import {Form} from 'react-bootstrap';
import {FormGroup, Label,  Input, Col } from 'reactstrap';
import axios from 'axios'; 

class SignUpClient extends Component {

    constructor(props) {
        super(props);

        this.state = {
            NomClient: '',
            PrenomClient: '',
            DatenaissClient:'',
            ProfessionClient:'',
            NiveauClient:'',
           emailClient: '',
           TelClient: '',
           LoginClient: '',
           passwordClient: '',
           AdresseClient: ''   ,
           client: []        
        };
        this.onChangeNomClient = this.onChangeNomClient.bind(this);
        this.onChangePrenomClient = this.onChangePrenomClient.bind(this);
        this.onChangeDatenaissClient = this.onChangeDatenaissClient.bind(this);
        this.onChangeProfessionClient = this.onChangeProfessionClient.bind(this);
        this.onChangeNiveauClient = this.onChangeNiveauClient.bind(this);
        this.onChangeemailClient = this.onChangeemailClient.bind(this);
        this.onChangeTelClient = this.onChangeTelClient.bind(this);
        this.onChangeLoginClient = this.onChangeLoginClient.bind(this);
        this.onChangepasswordClient = this.onChangepasswordClient.bind(this);
        this.onChangeAdresseClient = this.onChangeAdresseClient.bind(this);
        this.onSubmit = this.onSubmit.bind(this);        
    }
      
    
    //react life cycle methode end

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

    onChangeLoginClient(e) {
        this.setState({
            LoginClient: e.target.value
        });
    }

    onChangepasswordClient(e) {
        this.setState({
            passwordClient: e.target.value
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
           LoginClient:  this.state.LoginClient,
           passwordClient:  this.state.passwordClient,
           AdresseClient: this.state.AdresseClient 
        }
      
        console.log(client);
        
        axios.post('http://localhost:5000/Client/add', client)
        .then(res => console.log(res.data));
      
        window.location = '/';
        
    }




    render(){
        return(
           
    <div className="row row-content">
        <div className="col-12">
               
               <h3>Sign Up</h3>
               <br/>
           </div>
        <div className="col-12 col-md-9">
            <Form onSubmit={this.onSubmit}>
                <FormGroup row>
                    <Label htmlFor="NomClient" md={5}>Nom</Label>
                        <Col md={7}>
                            <Input type="text" id="NomClient" name="NomClient"
                            placeholder="Nom"
                            value={this.state.NomClient}
                            onChange={this.onChangeNomClient} />
                        </Col>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="PrenomClient" md={5}>Prenom</Label>
                        <Col md={7}>
                            <Input type="text" id="PrenomClient" name="PrenomClient"
                                placeholder="Prenom"
                                value={this.state.PrenomClient}
                                onChange={this.onChangePrenomClient} />
                        </Col>                        
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="DatenaissClient" md={5}>Date NaissUser</Label>
                        <Col md={7}>
                            <Input type="Date" id="DatenaissClient" name="DatenaissClient"
                                
                                value={this.state.DatenaissClient}
                                onChange={this.onChangeDatenaissClient} />
                        </Col>
                </FormGroup>

                <FormGroup row>
                        <Label htmlFor="ProfessionClient" md={5}>Profession</Label>
                        <Col md={7}>
                        <Input type="textarea" id="ProfessionClient" name="ProfessionClient"
                            value={this.state.ProfessionClient}
                            onChange={this.onChangeProfessionClient}></Input>
                        </Col>          
                    </FormGroup> 

                    <FormGroup row controlId="NiveauClient">
                        <Label htmlFor="NiveauClient" md={5}>Niveau </Label>
                        <Col md = {7}>

                            
                            <Input type="select"   value={this.state.NiveauClient} onChange={this.onChangeNiveauClient} name="NiveauClient">
                                
                            <option>Choose...</option>
                            <option>Moin</option>
                            <option>Bac</option>
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
                            <Input type="email" id="emailClient" name="emailClient"
                                placeholder="Email"
                                value={this.state.emailClient}
                                onChange={this.onChangeemailClient} />
                        </Col>
                </FormGroup>

                    <FormGroup row>
                        <Label htmlFor="TelClient" md={5}>Téléphone</Label>
                            <Col md={7}>
                                <Input type="tel" id="TelClient" name="TelClient"
                                    placeholder="Téléphne"
                                    value={this.state.TelClient}
                                    onChange={this.onChangeTelClient} />
                            </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label htmlFor="AdresseClient" md={5}>Adresse Client</Label>
                            <Col md={7}>
                                <Input type="text" id="AdresseClient" name="AdresseClient"
                                    placeholder="Adresse Client"
                                    value={this.state.AdresseClient}
                                    onChange={this.onChangeAdresseClient} />
                            </Col>
                    </FormGroup>

                <FormGroup row>
                    <Label htmlFor="LoginClient" md={5}>Login</Label>
                        <Col md={7}>
                            <Input type="text" id="LoginClient" name="LoginClient"
                                placeholder="Login"
                                value={this.state.LoginClient}
                                onChange={this.onChangeLoginClient} />
                        </Col>
                </FormGroup>
                                    
                    
                    <FormGroup row>
                    <Label htmlFor="passwordClient" md={5}>Mot de passe</Label>
                        <Col md={7}>
                            <Input type="password" id="passwordClient" name="passwordClient"
                                placeholder="Mot de passe"
                                value={this.state.passwordClient}
                                onChange={this.onChangepasswordClient} />
                        </Col>
                </FormGroup>

                    <FormGroup row>
                        <Col md={{size: 10, offset: 8}}>
                        <div className="form-group">
                            <input type="submit" value="Creation Compte" className="btn btn-primary" />
                        </div>
                        </Col>        
                    </FormGroup>        
                            
            </Form>                    
        </div>                    
                        
</div>      
               
    );
    

}
}
export default SignUpClient;