import React, { Component, mobiscroll } from 'react';
import { Button, Form, FormGroup, Input, Label, Col  } from 'reactstrap';
import {FormControl} from 'react-bootstrap';


class SignupCentre extends Component {

    constructor(props) {
        super(props);

        this.state = {
           NomCentre: '',
           Adresse: '',
           Tel: '',
            email: '',
            region: '',
            description: '',
            password: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
   
    }
    render(){
        return(
    <div className="row row-content">
       
        <div className="col-12 col-md-9">
            <Form onSubmit={this.handleSubmit}>
                <FormGroup row>
                    <Label htmlFor="NomCentre" md={5}>Nom du Centre</Label>
                        <Col md={7}>
                            <Input type="text" id="NomCentre" name="NomCentre"
                             placeholder="Nom du centre"
                             value={this.state.NomCentre}
                             onChange={this.handleInputChange} />
                        </Col>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="Adresse" md={5}>Adresse</Label>
                        <Col md={7}>
                            <Input type="text" id="Adresse" name="Adresse"
                                placeholder="Adresse"
                                value={this.state.Adresse}
                                onChange={this.handleInputChange} />
                        </Col>                        
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="Tel" md={5}>Téléphone</Label>
                        <Col md={7}>
                            <Input type="tel" id="Tel" name="Tel"
                                placeholder="Téléphne"
                                value={this.state.Tel}
                                onChange={this.handleInputChange} />
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
                <FormGroup row controlId="region">
                    <Label htmlFor="region" md={5}>Région</Label>
                    <Col md = {7}>

                           
                        <Input type="select"   value={this.state.region} onChange={this.handleInputChange} name="Region">
                               
                        <option>Choose...</option>
                        <option>Sousse</option>
                        <option>Monastir</option>
                        <option>Mahdia</option>
                        <option>Tunis</option>
                                    
                        </Input>
                    </Col>
                </FormGroup>

                {/* <FormGroup row controlId="domaine">
                    <Label htmlFor="domaine" md={5}> Domaine </Label> 
                                  
                    <FormControl as="select"  onChange={this.handleInputChange} value={this.state.region} >
                         value={[3,4]} select="multiple">
                                       
                             <option value="1">info</option>
                             <option value="2">gestion</option>
                             <option value="3">autre</option>
                                    
                                    
                    </FormControl>                    
                   
                    </FormGroup> */}                   
                     <FormGroup row>
                        <Label htmlFor="description" md={5}>Description</Label>
                        <Col md={7}>
                        <Input type="textarea" id="description" name="description"
                            rows="6"
                            value={this.state.description}
                            onChange={this.handleInputChange}></Input>
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
export default SignupCentre;