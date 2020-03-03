import React, { Component} from 'react';
import {Form , Button} from 'react-bootstrap';
import {FormGroup, Label,  Input, Col } from 'reactstrap';

class SignupUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
           NomUser: '',
           PrenomUser: '',
           DatenaissUser:'',
           ProfessionUser:'',
           NiveauUser:'',
           emailUser: '',
           TelUser: '',
           LoginUser: '',
            passwordUser: '',
            AdresseUser: ''
            
        };
        
    }

    render(){
        return(
           
    <div className="row row-content">
        <div className="col-12">
               
               <h3>Sign Up</h3>
               <br/>
           </div>
        <div className="col-12 col-md-9">
            <Form onSubmit={this.handleSubmit}>
                <FormGroup row>
                    <Label htmlFor="NomUser" md={5}>Nom</Label>
                        <Col md={7}>
                            <Input type="text" id="NomUser" name="NomUser"
                            placeholder="Nom"
                            value={this.state.NomUser}
                            onChange={this.handleInputChange} />
                        </Col>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="PrenomUser" md={5}>Prenom</Label>
                        <Col md={7}>
                            <Input type="text" id="PrenomUser" name="PrenomUser"
                                placeholder="Prenom"
                                value={this.state.PrenomUser}
                                onChange={this.handleInputChange} />
                        </Col>                        
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="DatenaissUser" md={5}>Date NaissUser</Label>
                        <Col md={7}>
                            <Input type="Date" id="DatenaissUser" name="DatenaissUser"
                                
                                value={this.state.DatenaissUser}
                                onChange={this.handleInputChange} />
                        </Col>
                </FormGroup>

                <FormGroup row>
                        <Label htmlFor="ProfessionUser" md={5}>Profession</Label>
                        <Col md={7}>
                        <Input type="textarea" id="ProfessionUser" name="ProfessionUser"
                            value={this.state.ProfessionUser}
                            onChange={this.handleInputChange}></Input>
                        </Col>          
                    </FormGroup> 

                    <FormGroup row controlId="NiveauUser">
                        <Label htmlFor="NiveauUser" md={5}>Niveau </Label>
                        <Col md = {7}>

                            
                            <Input type="select"   value={this.state.NiveauUser} onChange={this.handleInputChange} name="NiveauUser">
                                
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
                    <Label htmlFor="email" md={5}>Email</Label>
                        <Col md={7}>
                            <Input type="email" id="email" name="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.handleInputChange} />
                        </Col>
                </FormGroup>

                    <FormGroup row>
                        <Label htmlFor="TelUser" md={5}>Téléphone</Label>
                            <Col md={7}>
                                <Input type="tel" id="TelUser" name="TelUser"
                                    placeholder="Téléphne"
                                    value={this.state.TelUser}
                                    onChange={this.handleInputChange} />
                            </Col>
                    </FormGroup>

                <FormGroup row>
                    <Label htmlFor="LoginUser" md={5}>Email</Label>
                        <Col md={7}>
                            <Input type="text" id="LoginUser" name="LoginUser"
                                placeholder="Login"
                                value={this.state.LoginUser}
                                onChange={this.handleInputChange} />
                        </Col>
                </FormGroup>
                                    
                    
                    <FormGroup row>
                    <Label htmlFor="password" md={5}>Mot de passe</Label>
                        <Col md={7}>
                            <Input type="password" id="password" name="password"
                                placeholder="Mot de passe"
                                value={this.state.password}
                                onChange={this.handleInputChange} />
                        </Col>
                </FormGroup>

                    <FormGroup row>
                        <Col md={{size: 10, offset: 8}}>
                            <Button type="submit" color="primary">
                            Sign Up
                            </Button>
                        </Col>        
                    </FormGroup>        
                            
            </Form>                    
        </div>                    
                        
</div>      
               
    );
    

}
}
export default SignupUser;