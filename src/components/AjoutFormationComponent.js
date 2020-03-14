import React, { Component } from 'react';
import {Form} from 'react-bootstrap';
import {FormGroup, Label,  Input, Col } from 'reactstrap';
import axios from 'axios'; 

class ajoutformation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            CodeFormation:'',
            LibelleFormation:'',
            DateDebutFormation:'',
            DateFinFormation:'',
            DescriptionFormation:'',
            CapaciteFormation:'',
            NomTheme:'',
            NomFormateur:'',
            NomCentre:'',
            themes:[] ,
            formateurs:[],
            centres:[]
        };

        this.onChangeCodeFormation = this.onChangeCodeFormation.bind(this);
        this.onChangeLibelleFormation =this.onChangeLibelleFormation.bind(this);
        this.onChangeDateDebutFormation = this.onChangeDateDebutFormation.bind(this);
        this.onChangeDateFinFormation =this.onChangeDateFinFormation.bind(this);
        this.onChangeDescriptionFormation = this.onChangeDescriptionFormation.bind(this);
        this.onChangeCapaciteFormation =this.onChangeCapaciteFormation.bind(this);
        this.onChangeNomTheme = this.onChangeNomTheme.bind(this);
        this.onChangeNomFormateur =this.onChangeNomFormateur.bind(this);
        this.onChangeNomCentre=this.onChangeNomCentre.bind(this);

        this.onSubmit = this.onSubmit.bind(this); 
    }
    //didmount begin
    componentDidMount() {
        
        //themes axios get 
        axios.get('http://localhost:5000/Theme/')
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                themes: response.data.map(theme => theme.NomTheme),
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })
        //formateur axios get
        axios.get('http://localhost:5000/Formateur/')
          .then(response2 => {
            if (response2.data.length > 0) {
              this.setState({
                formateurs: response2.data.map(Formateur => Formateur.NomFormateur),
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })
    
          //Centre axios get
        axios.get('http://localhost:5000/Centre/')
        .then(response3 => {
          if (response3.data.length > 0) {
            this.setState({
              centres: response3.data.map(Centre => Centre.NomCentre),
            })
          }
        })
        .catch((error) => {
          console.log(error);
        })


      }

    //didmount end


    onChangeCodeFormation(e) {
        this.setState({
            CodeFormation: e.target.value
        });
    }

    onChangeLibelleFormation(e) {
        this.setState({
            LibelleFormation: e.target.value
        });
    }

    onChangeDateDebutFormation(e) {
        this.setState({
            DateDebutFormation: e.target.value
        });
    }

    onChangeDateFinFormation(e) {
        this.setState({
            DateFinFormation: e.target.value
        });
    }

    onChangeDescriptionFormation(e) {
        this.setState({
            DescriptionFormation: e.target.value
        });
    }

    onChangeCapaciteFormation(e) {
        this.setState({
            CapaciteFormation: e.target.value
        });
    }

    onChangeNomTheme(e) {
        this.setState({
            NomTheme: e.target.value
        });
    }

    onChangeNomFormateur(e) {
        this.setState({
            NomFormateur: e.target.value
        });
    }

    onChangeNomCentre(e) {
        this.setState({
            NomCentre: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const formation = {
            CodeFormation: this.state.CodeFormation,
            LibelleFormation: this.state.LibelleFormation,
            DateDebutFormation: this.state.DateDebutFormation,
            DateFinFormation: this.state.DateFinFormation,
            DescriptionFormation: this.state.DescriptionFormation,
            CapaciteFormation:  this.state.CapaciteFormation,
            NomTheme: this.state.NomTheme,
            NomFormateur:  this.state.NomFormateur,
            NomCentre:  this.state.NomCentre       
        }
      
        console.log(formation);
        
        axios.post('http://localhost:5000/Formation/add', formation)
        .then(res => console.log(res.data))
        .catch((error) => {
            console.log(error);
          });

        window.location = '/';
        
    }

    render(){
        return(
            <div className="row row-content">
                <div className="col-12 col-md-9">
                    <Form onSubmit={this.onSubmit}>
                    <FormGroup row>
                        <Label htmlFor="CodeFormation" md={5}>Code Formation</Label>
                            <Col md={7}>
                                <Input type="text" id="CodeFormation" name="CodeFormation"
                                placeholder="Code Formation"
                                value={this.state.CodeFormation}
                                onChange={this.onChangeCodeFormation} />
                            </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label htmlFor="LibelleFormation" md={5}>Libelle Formation</Label>
                            <Col md={7}>
                                <Input type="text" id="LibelleFormation" name="LibelleFormation"
                                placeholder="Libelle Formation"
                                value={this.state.LibelleFormation}
                                onChange={this.onChangeLibelleFormation} />
                            </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label htmlFor="DateDebutFormation" md={5}>Date Debut Formation</Label>
                            <Col md={7}>
                                <Input type="Date" id="DateDebutFormation" name="DateDebutFormation"
                                    
                                    value={this.state.DateDebutFormation}
                                    onChange={this.onChangeDateDebutFormation} />
                            </Col>                        
                    </FormGroup>

                    <FormGroup row>
                        <Label htmlFor="DateFinFormation" md={5}>Date Fin Formation</Label>
                            <Col md={7}>
                                <Input type="Date" id="DateFinFormation" name="DateFinFormation"
                                    
                                    value={this.state.DateFinFormation}
                                    onChange={this.onChangeDateFinFormation} />
                            </Col>
                    </FormGroup>

                    <FormGroup row>
                            <Label htmlFor="DescriptionFormation" md={5}>Description Formation</Label>
                            <Col md={7}>
                            <Input type="textarea" id="DescriptionFormation" name="DescriptionFormation"
                                value={this.state.DescriptionFormation}
                                onChange={this.onChangeDescriptionFormation}></Input>
                            </Col>          
                        </FormGroup> 

                        <FormGroup row>
                        <Label htmlFor="CapaciteFormation" md={5}>Capacite Formation</Label>
                            <Col md={7}>
                                <Input type="number" id="CapaciteFormation" name="CapaciteFormation"
                                    placeholder="Capacite Formation"
                                    value={this.state.CapaciteFormation}
                                    onChange={this.onChangeCapaciteFormation} />
                            </Col>
                    </FormGroup>
                    
                    <FormGroup row>
                        <Label  md={5}>Nom Theme: </Label>
                        <Col md={7}>
                        <Input className="form-control"  required type="select"  id="NomTheme" name="NomTheme"
                         value={this.state.NomTheme} onChange={this.onChangeNomTheme} >
                             {
                                this.state.themes.map(function(theme) {
                                return <option 
                                    key={theme._id}
                                    value={theme}>{theme}
                                    </option>;
                                })
                            } 
                        </Input>
                      
                        </Col>  
                
                    </FormGroup>

                    <FormGroup row>
                        <Label md={5}>Nom Formateur: </Label>
                        <Col md={7}>
                        <Input className="form-control"  required type="select"  id="NomFormateur" name="NomFormateur"
                         value={this.state.NomFormateur} onChange={this.onChangeNomFormateur} >
                             {
                                this.state.formateurs.map(function(formateur) {
                                return <option 
                                    key={formateur._id}
                                    value={formateur}>{formateur}
                                    </option>;
                                })
                            } 
                        </Input>
                             
                        </Col>
                    </FormGroup>  


                    <FormGroup row>
                    
                        <Label md={5}>Nom Centre: </Label>
                        <Col md={7}>
                        <Input className="form-control"  required type="select"   id="NomCentre" name="NomCentre"
                         value={this.state.NomCentre} onChange={this.onChangeNomCentre} >
                             {
                                this.state.centres.map(function(centre) {
                                return <option 
                                    key={centre._id}
                                    value={centre}>{centre}
                                    </option>;
                                })
                            } 
                        </Input>
                              
                        </Col>
                    </FormGroup>  

                    <FormGroup row>
                        <Col md={{size: 10, offset: 8}}>
                        
                            <input type="submit" value="Creation Formation" className="btn btn-primary" />
                         
                        </Col>        
                    </FormGroup>        
                                
                    </Form>  
            </div>
            </div>     
               
    );
    

}
}
export default ajoutformation;