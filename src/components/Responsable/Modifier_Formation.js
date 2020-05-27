import React, { Component } from 'react';
import {Form,Image} from 'react-bootstrap';
import {FormGroup, Label,  Input, Col } from 'reactstrap';
import axios from 'axios';
import SideBar from "./sidebar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Breadcrumb, BreadcrumbItem} from 'react-bootstrap';
import moment from 'moment';

class ModiferFormation extends Component {
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
        image: '',
        selectedImage:'',
        Prix: ''
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
    this.onChangePrix = this.onChangePrix.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);

    this.onSubmit = this.onSubmit.bind(this); 
  }


   //didmount begin
  componentDidMount() {
    axios.get('http://localhost:5000/Formation/'+this.props.match.params.id)
      .then(response => {
        this.setState({
            CodeFormation: response.data.CodeFormation,
            LibelleFormation: response.data.LibelleFormation,
            DateDebutFormation:  response.data.DateDebutFormation,
            DateFinFormation: response.data.DateFinFormation,
            DescriptionFormation: response.data.DescriptionFormation,
            CapaciteFormation: response.data.CapaciteFormation,
            NomTheme: response.data.NomTheme,
            NomFormateur: response.data.NomFormateur,
            NomCentre: response.data.NomCentre,
            Prix: response.data.Prix,
            selectedImage: response.data.imageFormation,
            image : response.data.imageFormation
        })   
      })
      .catch((error) => {
        console.log(error);
      })


        //themes axios get 
        axios.get('http://localhost:5000/Theme/')
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                themes: response.data.map(theme => theme.NomTheme),
              })
            }
          })

        //formateur axios get
        const {centre} = this.props.auth;
        axios.get('http://localhost:5000/Formateur/listbynamecentre/'+centre.NomCentre)
          .then(response2 => {
            if (response2.data.length > 0) {
              this.setState({
                formateurs: response2.data.map(Formateur => Formateur.NomFormateur+' '+Formateur.PrenomFormateur),  
              })
              this.setState({
                NomFormateur: this.state.formateurs[0]
              })
    
            }
          })
          .catch((error) => {
            console.log(error);
          })
       
    }
    //didmount end

    onChangeImage (e) {
        this.setState({
            image: e.target.files[0],
            selectedImage:URL.createObjectURL(e.target.files[0])
        });
    };

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

    onChangePrix(e) {
        this.setState({
            Prix: e.target.value
        });
    }

    //récupération des donnees du l'Input
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
        NomCentre:  this.state.NomCentre   ,
        Prix: this.state.Prix    
    }

    console.log(formation);

    axios.post('http://localhost:5000/Formation/update/' + this.props.match.params.id, formation)
      .then(res => console.log(res.data));
      
    if (this.state.selectedImage ){
        let ImageFormation = new FormData();
      ImageFormation.append("imageFormation", this.state.image)
      console.log(this.state.image) 
     axios.post('http://localhost:5000/Formation/updateImageFormation/' + this.props.match.params.id, ImageFormation)
      .then(res => console.log(res.data) );}
      window.location = '/FormationList';

  }

  render() {
    let image = this.state.selectedImage;
    if (this.state.image === this.state.selectedImage && this.state.image ){
        image = "http://localhost:5000/"+this.state.image
    }
    return (
        <div>
            <SideBar pageWrapId={"page-wrap"} />
            <div id="page-wrap">
                <div className=" container ">
                
                    <div className="row justify-content-md-center">
                    <section className="col-10 text-center"> 
                    <Breadcrumb>
                            <BreadcrumbItem href="/FormationList">Liste Des Formations</BreadcrumbItem>
                            <BreadcrumbItem active>Modifier Formation</BreadcrumbItem>
                </Breadcrumb>
                        <div className="col-10 ">
                            
                            <h3 className="text-center offset-3"> Modifier Formation </h3>
                            <br/>
                            <br/>
                            <Form onSubmit={this.onSubmit}>
                            <FormGroup row>
                            <Label htmlFor="image" md={5}> <b>Image de la Formation</b></Label>
                            <Col md={7}>
   
                            <Input  type="file" id="image" name="image" 
                            
                            className="process__upload-btn"
                            onChange={this.onChangeImage} />
                            </Col>
                            </FormGroup>

                            <FormGroup row>
                            <Col md={5}>
                            </Col>
                            <Col md={7}>
                            <Image src= {image} alt="im" 
                            width="300" height="280" />  
                            
                            </Col>
                            <br/>
                            </FormGroup>
                            
                            <FormGroup row>
                                
                                <Label htmlFor="CodeFormation" md={5}><br/> <b>Code Formation</b></Label>
                                    <Col md={7}><br/>
                                        <Input type="text" id="CodeFormation" name="CodeFormation"
                                        placeholder="Code Formation"
                                        value={this.state.CodeFormation}
                                        onChange={this.onChangeCodeFormation } />
                                    </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label htmlFor="LibelleFormation" md={5}> <b> Libelle Formation</b></Label>
                                    <Col md={7}>
                                        <Input type="text" id="LibelleFormation" name="LibelleFormation"
                                        placeholder="Libelle Formation"
                                        value={this.state.LibelleFormation}
                                        onChange={this.onChangeLibelleFormation} />
                                    </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label htmlFor="DateDebutFormation" md={5}> <b>Date Debut Formation</b></Label>
                                    <Col md={7}>
                                        <Input type="Date" id="DateDebutFormation" name="DateDebutFormation"                                            
                                            value= {moment(this.state.DateDebutFormation).format('YYYY-MM-DD')}
                                            onChange={this.onChangeDateDebutFormation} 
                                            max = {moment(this.state.DateFinFormation).format('YYYY-MM-DD')}/>
                                    </Col>                        
                            </FormGroup>

                            <FormGroup row>
                                <Label htmlFor="DateFinFormation" md={5}> <b>Date Fin Formation</b></Label>
                                    <Col md={7}>
                                        <Input type="Date" id="DateFinFormation" name="DateFinFormation"                                            
                                            value= {moment(this.state.DateFinFormation).format('YYYY-MM-DD')}
                                            min= {moment(this.state.DateDebutFormation).format('YYYY-MM-DD')}
                                            onChange={this.onChangeDateFinFormation} />
                                    </Col>
                            </FormGroup>

                            <FormGroup row>
                                    <Label htmlFor="DescriptionFormation" md={5}> <b>Description Formation</b></Label>
                                    <Col md={7}>
                                    <Input type="textarea" id="DescriptionFormation" name="DescriptionFormation"
                                        value={this.state.DescriptionFormation} placeholder="Déscription Formation"
                                        onChange={this.onChangeDescriptionFormation}></Input>
                                    </Col>          
                                </FormGroup> 

                                <FormGroup row>
                                <Label htmlFor="CapaciteFormation" md={5}> <b>Capacite Formation</b></Label>
                                    <Col md={7}>
                                        <Input type="number" id="CapaciteFormation" name="CapaciteFormation"
                                            placeholder="Capacite Formation"
                                            value={this.state.CapaciteFormation}
                                            onChange={this.onChangeCapaciteFormation} />
                                    </Col>
                            </FormGroup>
                            
                            <FormGroup row>
                                <Label  md={5}> <b>Nom Theme:</b> </Label>
                                <Col md={7}>
                                <Input className="form-control"  required type="select"  id="NomTheme" name="NomTheme"
                                value={this.state.NomTheme} onChange={this.onChangeNomTheme} >
                                    {
                                        this.state.themes.map(function(theme) {
                                        return (
                                        <option  key={theme} value={theme}> {theme} </option>
                                        );
                                        })
                                    } 
                                </Input>
                            
                                </Col>  
                        
                            </FormGroup>

                            <FormGroup row>
                                <Label md={5}> <b>Nom Formateur:</b> </Label>
                                <Col md={7}>
                                <Input className="form-control"  required type="select"  id="NomFormateur" name="NomFormateur"
                                value={this.state.NomFormateur} onChange={this.onChangeNomFormateur} >
                                    {
                                        this.state.formateurs.map(function(formateur) {
                                        return ( 
                                        <option key={formateur} value={formateur}>{formateur} </option>
                                        );
                                        })
                                    } 
                                </Input>
                                    
                                </Col>
                            </FormGroup>  

                            <FormGroup row>
                                <Label htmlFor="Prix" md={5}> <b>Prix en Dinars:</b></Label>
                                    <Col md={7}>
                                        <Input type="number" id="Prix" name="Prix"
                                            placeholder="Prix en Dinars"
                                            value={this.state.Prix}
                                            onChange={this.onChangePrix} />
                                    </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col>  
                                <br/>
                                                    
                                    <input type="submit" value="Modifer" className=" offset-8 btn btn-primary" />
                                    
                                     <a className="offset-1 btn btn-secondary" href="/FormationList">
                                        Annuler
                                    </a>                         
                                </Col>
                                       
                            </FormGroup>                                          
                            </Form>           
                        </div>  
                        </section>          
                    </div>
                </div>  
            </div>
        </div>               
    );
  }
}
ModiferFormation.propTypes = {
    auth: PropTypes.object.isRequired
  };  

  const mapStateToProps = state => ({
    auth: state.auth
  });

export default connect(mapStateToProps)(ModiferFormation);