import React, { Component } from 'react';
import {Form} from 'react-bootstrap';
import {FormGroup, Label,  Input, Col, Button } from 'reactstrap';
import axios from 'axios'; 

import PropTypes from "prop-types";
import { connect } from "react-redux";
import SideBar from "./sidebar";
import moment from 'moment'


class AjoutFormation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            CodeFormation:'',
            LibelleFormation:'',
            DateDebutFormation:'',
            DateFinFormation: '',
            DescriptionFormation:'',
            CapaciteFormation:'',
            NomTheme:'',
            NomFormateur:'',
            NomCentre:'',
            themes:[] ,
            formateurs:[],
            Prix: '',
            image: '',
            selectedImage:'',
            id: ''
        };

        this.onChangeCodeFormation = this.onChangeCodeFormation.bind(this);
        this.onChangeLibelleFormation =this.onChangeLibelleFormation.bind(this);
        this.onChangeDateDebutFormation = this.onChangeDateDebutFormation.bind(this);
        this.onChangeDateFinFormation =this.onChangeDateFinFormation.bind(this);
        this.onChangeDescriptionFormation = this.onChangeDescriptionFormation.bind(this);
        this.onChangeCapaciteFormation =this.onChangeCapaciteFormation.bind(this);
        this.onChangeNomTheme = this.onChangeNomTheme.bind(this);
        this.onChangeNomFormateur =this.onChangeNomFormateur.bind(this);
        this.onChangePrix = this.onChangePrix.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
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
                    this.setState({
                    NomTheme: this.state.themes[0],
                    })
                }

            })          
          .catch((error) => {
            console.log(error);
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

    onChangePrix(e) {
        this.setState({
            Prix: e.target.value
        });
    }

//récupération des donnees du l'Input
    onSubmit(e) {
        e.preventDefault();
        const {centre} = this.props.auth;

        let formation = new FormData();
        formation.append(    "CodeFormation", this.state.CodeFormation);
        formation.append(    "LibelleFormation", this.state.LibelleFormation);
        formation.append(    "DateDebutFormation", this.state.DateDebutFormation);
        formation.append(    "DateFinFormation", this.state.DateFinFormation);
        formation.append(    "DescriptionFormation", this.state.DescriptionFormation);
        formation.append(    "CapaciteFormation", this.state.CapaciteFormation);
        formation.append(    "NomTheme", this.state.NomTheme);
        formation.append(    "NomFormateur", this.state.NomFormateur);
        formation.append(    "NomCentre", centre.NomCentre);
        formation.append(    "Prix", this.state.Prix);
        if (this.state.image){
        formation.append("imageFormation", this.state.image);}
        
        axios.post('http://localhost:5000/Formation/add', formation)
        .then( window.location = '/FormationList')
       
        .catch((error) => {
            console.log(error);
          });      
        
    }

    render(){
        if (!this.state.formateurs[0]){
            return(
              <div>
            <SideBar pageWrapId={"page-wrap"} />
            <div id="page-wrap">
              <div className=" container ">
              <div className="row justify-content-md-center">  
              <section className="col-10 text-center">   
              
                  <div className="col-12">
                    <br/>
                    <br/>
                    
                    <br/>
                    <br/>
                    <br/>
                    <h4 >
                     Il n'ya aucun formateur enregistré! <br/>
                     Veuillez ajouter un formateur avant d'ajouter une formation.
                    </h4>
                    <br/>
                    <br/>
                    <br/>
                    <a href="/ajoutformateur">
                      <Button className="btn btn-success btn-sm" >
                        <span className="fas fa-plus"/> Ajouter un formateur
                      </Button>
                    </a> 
                  </div>   
              </section>
            </div>
            </div>
            </div>
            </div>
            )
          }
        else{
            let image = this.state.selectedImage;
            
        return(
            <div>
                <SideBar pageWrapId={"page-wrap"} />
                <div id="page-wrap">
                    <div className=" container ">
                        <div className="row justify-content-md-center">
                            <div className="col-10">
                                 
                                <h3 className="text-center"> Ajouter une  Formation </h3>
                                <br/>
                                <br/>
                                <Form onSubmit={this.onSubmit}>
                                 <FormGroup row>
                            <Label htmlFor="imageFormation" md={5}> <b>Image de la Formation</b></Label>
                            <Col md={7}>
   
                            <Input  type="file" id="imageFormation" name="imageFormation" 
                            
                            className="process__upload-btn"
                            onChange={this.onChangeImage} />
                            <br/>
                            <img src= {image} alt="" 
                            width="300" height="200" />
                            </Col>
                            </FormGroup>
                                <FormGroup row>
                                    <br/>
                                    <Label htmlFor="CodeFormation" md={5}><b>Code Formation</b></Label>
                                        <Col md={7}>
                                            <Input type="text" id="CodeFormation" name="CodeFormation"
                                            placeholder="Code Formation"
                                            value={this.state.CodeFormation}
                                            onChange={this.onChangeCodeFormation} />
                                        </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label htmlFor="LibelleFormation" md={5}><b>Libelle Formation</b></Label>
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
                                             max = {moment(this.state.DateFinFormation).format('YYYY-MM-DD')}                                   
                                                value={this.state.DateDebutFormation}
                                                onChange={this.onChangeDateDebutFormation} />
                                        </Col>                        
                                </FormGroup>

                                <FormGroup row>
                                    <Label htmlFor="DateFinFormation" md={5}> <b>Date Fin Formation</b></Label>
                                        <Col md={7}>
                                            <Input type="Date" id="DateFinFormation" name="DateFinFormation"
                                                min = {moment(this.state.DateDebutFormation).format('YYYY-MM-DD')}
                                                value={this.state.DateFinFormation}
                                                onChange={this.onChangeDateFinFormation} />
                                        </Col>
                                </FormGroup>

                                <FormGroup row>
                                        <Label htmlFor="DescriptionFormation" md={5}><b>Déscription Formation</b></Label>
                                        <Col md={7}>
                                        <Input type="textarea" id="DescriptionFormation" name="DescriptionFormation"
                                            value={this.state.DescriptionFormation} placeholder="Déscription Formation"
                                            onChange={this.onChangeDescriptionFormation}></Input>
                                        </Col>          
                                    </FormGroup> 

                                    <FormGroup row>
                                    <Label htmlFor="CapaciteFormation" md={5}><b>Capacite Formation</b></Label>
                                        <Col md={7}>
                                            <Input type="number" id="CapaciteFormation" name="CapaciteFormation"
                                                placeholder="Capacité Formation"
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
                                            <option key={theme} value={theme}> {theme} </option>
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
                                            <option key={formateur}value={formateur}>{formateur} </option>
                                                );
                                            })
                                        } 
                                    </Input>
                                        
                                    </Col>
                                </FormGroup>    

                                <FormGroup row>
                                    <Label md={5}> <b>Prix en Dinars:</b> </Label>
                                    <Col md={7}>
                                    <Input className="form-control"  required type="text"  id="prix" name="prix"
                                    value={this.state.Prix} onChange={this.onChangePrix} placeholder="Prix en Dinars" >
                                       
                                    </Input>
                                        
                                    </Col>
                                </FormGroup> 

                                <FormGroup row>
                                    <Label md={5}>  </Label>
                                    <Col> 
                                    <br/>                       
                                        <input type="submit" value="Ajouter" className="btn btn-primary " /> 
                                        <a className="offset-1 btn btn-secondary" href="/FormationList">
                                        Annuler
                                    </a>                        
                                    </Col>        
                                </FormGroup>  
                                            
                                </Form>                   
                            </div>
                        </div> 
                    </div> 
                </div> 
            </div>                   
        );
    }
}
}
AjoutFormation.propTypes = {
    auth: PropTypes.object.isRequired
  };  

  const mapStateToProps = state => ({
    auth: state.auth
  });

export default connect(mapStateToProps)(AjoutFormation);