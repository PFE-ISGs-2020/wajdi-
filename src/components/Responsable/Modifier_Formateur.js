import React, { Component } from 'react';
import {Form} from 'react-bootstrap';
import {FormGroup, Label,  Input, Col } from 'reactstrap';
import axios from 'axios';
import SideBar from "./sidebar";


export default class ModiferFormateur extends Component {
  constructor(props) {
    super(props);

    this.state = {
        NomFormateur:'',
        PrenomFormateur:'',
        SpecialiteFormateur:'',
        NomCentre:''
    };

    this.onChangeNomFormateur = this.onChangeNomFormateur.bind(this);
    this.onChangePrenomFormateur =this.onChangePrenomFormateur.bind(this);
    this.onChangeSpecialiteFormateur = this.onChangeSpecialiteFormateur.bind(this);

    this.onSubmit = this.onSubmit.bind(this); 
  }
   //didmount begin
  componentDidMount() {
    axios.get('http://localhost:5000/Formateur/'+this.props.match.params.id)
      .then(response => {
        this.setState({
            NomFormateur: response.data.NomFormateur,
            PrenomFormateur: response.data.PrenomFormateur,
            SpecialiteFormateur: response.data.SpecialiteFormateur,
            NomCentre: response.data.NomCentre
        })   
      })
      .catch((error) => {
        console.log(error);
      })

    }
    //didmount end

    onChangeNomFormateur(e) {
        this.setState({
            NomFormateur: e.target.value
        });
    }

    onChangePrenomFormateur(e) {
        this.setState({
            PrenomFormateur: e.target.value
        });
    }

    onChangeSpecialiteFormateur(e) {
        this.setState({
            SpecialiteFormateur: e.target.value
        });
    }

    //récupération des donnees du l'Input
    onSubmit(e) {
    e.preventDefault();

    const formateur = {
        NomFormateur: this.state.NomFormateur,
        PrenomFormateur: this.state.PrenomFormateur,
        SpecialiteFormateur: this.state.SpecialiteFormateur,
        NomCentre:this.state.NomCentre
    }

    console.log(formateur);

    axios.post('http://localhost:5000/Formateur/update/' + this.props.match.params.id, formateur)
      .then(res => console.log(res.data));
      window.location = '/FormateurList';
  }

  render() {
    return (
        <div>
            <SideBar pageWrapId={"page-wrap"} />
            <div id="page-wrap">
                <div className=" container ">
                    <div className="row justify-content-md-center">
                        <div className="col-10 text-center">
                            
                            <h3> Modifier Formateur </h3>
                            <br/>
                            <br/>
                            <Form onSubmit={this.onSubmit}>
                            <FormGroup row>
                                <Label htmlFor="NomFormateur" md={5}> <b>Nom</b> </Label>
                                    <Col md={7}>
                                        <Input type="text" id="NomFormateur" name="NomFormateur"
                                        placeholder="Nom "
                                        value={this.state.NomFormateur}
                                        onChange={this.onChangeNomFormateur } />
                                    </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label htmlFor="PrenomFormateur" md={5}> <b>Prénom</b></Label>
                                    <Col md={7}>
                                        <Input type="text" id="PrenomFormateur" name="PrenomFormateur"
                                        placeholder="Prénom "
                                        value={this.state.PrenomFormateur}
                                        onChange={this.onChangePrenomFormateur} />
                                    </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label htmlFor="SpecialiteFormateur" md={5}><b>Specialité</b></Label>
                                    <Col md={7}>
                                        <Input type="text" id="SpecialiteFormateur" name="SpecialiteFormateur"
                                            placeholder="Specialite "
                                            value={this.state.SpecialiteFormateur}
                                            onChange={this.onChangeSpecialiteFormateur} />
                                    </Col>                        
                            </FormGroup>

                            <FormGroup row>
                                <Col>                        
                                    <input type="submit" value="Modifer " className="btn btn-primary" />                         
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