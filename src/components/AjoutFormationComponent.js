import React, { Component } from 'react';
import {Form , Button} from 'react-bootstrap';
import {FormGroup, Label,  Input, Col } from 'reactstrap';

class ajoutformation extends Component {

    constructor(props) {
        super(props);

        this.state = {
           CodeFormation:'',
           LibelleFormation:'',
           DatedebFormation:'',
           DatefinFormation:'',
           DescriptionFormation:'',
           CapaciteFormation:'',
           FiliereFormation:'',
           TuteurFormation:''            
        };
        
    }

    render(){
        return(
            <div className="row row-content">
                <div className="col-12 col-md-9">
                    <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <Label htmlFor="LibelleFormation" md={5}>Libelle Formation</Label>
                            <Col md={7}>
                                <Input type="text" id="LibelleFormation" name="LibelleFormation"
                                placeholder="LibelleFormation"
                                value={this.state.LibelleFormation}
                                onChange={this.handleInputChange} />
                            </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="DatedebFormation" md={5}>Date debut Formation</Label>
                            <Col md={7}>
                                <Input type="Date" id="DatedebFormation" name="DatedebFormation"
                                    
                                    value={this.state.DatedebFormation}
                                    onChange={this.handleInputChange} />
                            </Col>                        
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="DatefinFormation" md={5}>Date fin Formation</Label>
                            <Col md={7}>
                                <Input type="Date" id="DatefinFormation" name="DatefinFormation"
                                    
                                    value={this.state.DatefinFormation}
                                    onChange={this.handleInputChange} />
                            </Col>
                    </FormGroup>

                    <FormGroup row>
                            <Label htmlFor="DescriptionFormation" md={5}>Description Formation</Label>
                            <Col md={7}>
                            <Input type="textarea" id="DescriptionFormation" name="DescriptionFormation"
                                value={this.state.DescriptionFormation}
                                onChange={this.handleInputChange}></Input>
                            </Col>          
                        </FormGroup> 

                        <FormGroup row>
                        <Label htmlFor="CapaciteFormation" md={5}>Capacite Formation</Label>
                            <Col md={7}>
                                <Input type="number" id="CapaciteFormation" name="CapaciteFormation"
                                    placeholder="Capacite Formation"
                                    value={this.state.CapaciteFormation}
                                    onChange={this.handleInputChange} />
                            </Col>
                    </FormGroup>

                        <FormGroup row>
                            <Label htmlFor="FiliereFormation" md={5}>Filiere Formation</Label>
                                <Col md={7}>
                                    <Input type="text" id="FiliereFormation" name="FiliereFormation"
                                        placeholder="Filiere Formation"
                                        value={this.state.FiliereFormation}
                                        onChange={this.handleInputChange} />
                                </Col>
                        </FormGroup>

                    <FormGroup row>
                        <Label htmlFor="TuteurFormation" md={5}>TuteurFormation</Label>
                            <Col md={7}>
                                <Input type="text" id="TuteurFormation" name="TuteurFormation"
                                    placeholder="Tuteur Formation"
                                    value={this.state.TuteurFormation}
                                    onChange={this.handleInputChange} />
                            </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Col md={{size: 10, offset: 8}}>
                            <Button type="submit" color="primary">
                            Ajouter
                            </Button>
                        </Col>        
                    </FormGroup>        
                                
                    </Form>  
            </div>
            </div>     
               
    );
    

}
}
export default ajoutformation;